using CR_Tracker_Module_New.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace CR_Tracker_Module_New.Controllers
{
    public class CR_TrackerController : Controller
    {
        #region Common Funtions
        public static string Get_Connection_String()
        {
            //Local
            string connectionString = @"Data Source=ADMIN-PC;Initial Catalog=db_cr_details;Integrated Security=true;";
            return connectionString;
        }

        private static List<T> ConvertDataTable<T>(DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }
        private static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == column.ColumnName)
                        pro.SetValue(obj, dr[column.ColumnName], null);
                    else
                        continue;
                }
            }
            return obj;
        }

        #endregion
        
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult CR_Tracker_Dashboard()
        {
            var obj_cr_details = new CR_Tracker_Details();
            //obj_cr_details.All_CR_Details_Count = 0;
            //obj_cr_details.CR_Working_Count = 0;
            //obj_cr_details.CR_Complete_Count = 0;
            //obj_cr_details.CR_UAT_Count = 0;
            try
            {
                string str_select = "SELECT * FROM tbl_CR_Details ORDER BY Created DESC";
                DataTable cr_dt = Shared.DbHelper.ExecuteTextQuerySql(Get_Connection_String(), str_select);

                if (cr_dt.Rows.Count > 0)
                {
                    obj_cr_details.All_CR_Details_Count = cr_dt.Rows.Count;
                    obj_cr_details.CR_Working_Count = cr_dt.AsEnumerable().Where(a => !string.IsNullOrEmpty(a.Field<string>("CR_Status")) && a.Field<string>("CR_Status") == "Working").ToList().Count;
                    obj_cr_details.CR_Complete_Count = cr_dt.AsEnumerable().Where(a => !string.IsNullOrEmpty(a.Field<string>("CR_Status")) && a.Field<string>("CR_Status") == "Completed").ToList().Count;
                    obj_cr_details.CR_UAT_Count = cr_dt.AsEnumerable().Where(a => !string.IsNullOrEmpty(a.Field<string>("CR_Status")) && a.Field<string>("CR_Status") == "UAT").ToList().Count;
                }
                return View(obj_cr_details);
            }
            catch (Exception ex)
            {
                ViewBag.Error_Message = ex.Message.ToString();
                return View(obj_cr_details);
            }
        }

        public ActionResult CR_Details_DataTableP(string status)
        {
            try
            {
                StringBuilder str_select = new StringBuilder();
                //Normal Condition
                str_select.Append("SELECT * FROM tbl_CR_Details ");
                if (status == "Working")
                { str_select.Append("WHERE CR_Status = 'Working' "); }
                else if (status == "Completed")
                { str_select.Append("WHERE CR_Status = 'Completed' "); }
                else if (status == "UAT")
                { str_select.Append("WHERE CR_Status = 'UAT' "); }
                //Applying Order By On CR_ID
                str_select.Append("ORDER BY CR_ID DESC");
                DataTable cr_dt = Shared.DbHelper.ExecuteTextQuerySql(Get_Connection_String(), str_select.ToString());
                return PartialView(cr_dt);
            }
            catch (Exception ex)
            {
                ViewBag.Error_Message = ex.Message.ToString();
                return PartialView();
            }
        }

        public JsonResult CR_Pie_Chart_Details()
        {
            try
            {
                var CR_Details = new List<CR_Pie_Chart_Count>();
                string str_select = "SELECT CR_Status, COUNT(*) AS CR_Status_Count FROM tbl_CR_Details GROUP BY CR_Status";
                DataTable cr_dt = Shared.DbHelper.ExecuteTextQuerySql(Get_Connection_String(), str_select);
                if (cr_dt!=null && cr_dt.Rows.Count > 0)
                {
                    CR_Details = ConvertDataTable<CR_Pie_Chart_Count>(cr_dt);
                }
                return Json(CR_Details, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { ok = false, message = ex.Message.ToString(), JsonRequestBehavior.AllowGet });
            }
        }

        public JsonResult CR_Stack_Bar_Details()
        {
            try
            {
                var CR_Details = new List<CR_Stack_Bar_Count>();
                string str_select = "SELECT ProjectCRReceivedDate,CR_Status FROM tbl_CR_Details where(ProjectCRReceivedDate > dateadd(m, -6, getdate() - datepart(d, getdate()) + 1))";
                DataTable cr_dt = Shared.DbHelper.ExecuteTextQuerySql(Get_Connection_String(), str_select);
                if (cr_dt != null && cr_dt.Rows.Count > 0)
                {
                    //getting last 6 month records
                    for (int i = 0; i < 6; i++)
                    {
                        var today = DateTime.Today.AddMonths(-i);
                        DateTime first = new DateTime(today.Year, today.Month, 1);
                        DateTime last = first.AddMonths(1).AddSeconds(-1);
                        string FDay = first.ToString("dd-MMM-yy") + " 12:00:00 AM";      //getting first day of month
                        string LDay = last.ToString("dd-MMM-yy") + " 12:00:00 AM";       //getting last day of month
                        //finding records from FirstDay of month to LastDay of month 
                        var cr_obj = cr_dt.AsEnumerable().AsEnumerable().Where(a => !DBNull.Value.Equals(a["ProjectCRReceivedDate"])
                        && (Convert.ToDateTime(a["ProjectCRReceivedDate"]) >= Convert.ToDateTime(FDay))
                        && (Convert.ToDateTime(a["ProjectCRReceivedDate"]) <= Convert.ToDateTime(LDay))).ToList();

                        //adding month wise records into list
                        var cr_count_obj = new CR_Stack_Bar_Count();
                        cr_count_obj.CR_Months = today.ToString("MMM-yy");
                        cr_count_obj.Completed_Count = cr_obj.Where(a => a.Field<string>("CR_Status") == "Completed").Count();
                        cr_count_obj.UAT_Count= cr_obj.Where(a => a.Field<string>("CR_Status") == "UAT").Count();
                        cr_count_obj.Pending_Count = cr_obj.Where(a => a.Field<string>("CR_Status") == "Pending").Count();
                        cr_count_obj.Other_Count = cr_obj.Where(a => a.Field<string>("CR_Status") != "Completed" && a.Field<string>("CR_Status") != "UAT" && a.Field<string>("CR_Status") != "Pending").Count();
                        CR_Details.Add(cr_count_obj);
                    }
                }
                return Json(CR_Details, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message.ToString(), JsonRequestBehavior.AllowGet);
            }
        }
    }
}