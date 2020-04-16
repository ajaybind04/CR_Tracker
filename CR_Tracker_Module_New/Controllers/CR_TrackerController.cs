using CR_Tracker_Module.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace CR_Tracker_Module_New.Controllers
{
    public class CR_TrackerController : Controller
    {
        public static string Get_Connection_String()
        {
            //Local
            string connectionString = @"Data Source=admin-pc;Initial Catalog=db_cr_details;Integrated Security=true;";
            return connectionString;
        }

        // GET: CR_Tracker
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
                    obj_cr_details.CR_UAT_Count = cr_dt.AsEnumerable().Where(a => !string.IsNullOrEmpty(a.Field<string>("CR_Status")) && a.Field<string>("CR_Status") == "UAT Done").ToList().Count;
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

    }
}