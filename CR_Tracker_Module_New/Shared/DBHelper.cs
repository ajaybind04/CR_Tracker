//using Oracle.ManagedDataAccess.Client;
//using Oracle.ManagedDataAccess.Types;
using System;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;

namespace CR_Tracker_Module_New.Shared
{
    /// <summary>
    /// DB helper class
    /// </summary>
    public class DbHelper
    {
        //#region " Oracle Helper "

        ///// <summary>
        ///// Gets the data table.
        ///// </summary>
        ///// <param name="connectionString">The connection string.</param>
        ///// <param name="storedProcedureName">Name of the stored procedure.</param>
        ///// <param name="refCursorOutParamName">Name of the ref cursor out param.</param>
        ///// <param name="paramsName">Name of the params.</param>
        ///// <returns></returns>
        //public static DataTable GetDataTable(string connectionString, string storedProcedureName, string refCursorOutParamName, params OracleParameter[] paramsName)
        //{
        //    var dt = new DataTable();

        //    using (var con = new OracleConnection(connectionString))
        //    {
        //        var com = con.CreateCommand();
        //        com.CommandType = CommandType.StoredProcedure;
        //        foreach (var p in paramsName)
        //        {
        //            com.Parameters.Add(p);
        //        }

        //        com.CommandText = storedProcedureName;

        //        com.Connection.Open();
        //        com.ExecuteNonQuery();

        //        var refCursor = (OracleRefCursor)com.Parameters[refCursorOutParamName].Value;
        //        var da = new OracleDataAdapter();
        //        da.Fill(dt, refCursor);

        //        com.Connection.Close();
        //    }

        //    return dt;
        //}

        ///// <summary>
        ///// Gets the value.
        ///// </summary>
        ///// <param name="connectionString">The connection string.</param>
        ///// <param name="storedProcedureName">Name of the stored procedure.</param>
        ///// <param name="outParamName">Name of the out param.</param>
        ///// <param name="paramsName">Name of the params.</param>
        ///// <returns></returns>
        //public static string GetValue(string connectionString, string storedProcedureName, string outParamName, params OracleParameter[] paramsName)
        //{
        //    string outParamValue = string.Empty;

        //    using (var con = new OracleConnection(connectionString))
        //    {
        //        var com = con.CreateCommand();
        //        com.CommandType = CommandType.StoredProcedure;
        //        com.CommandText = storedProcedureName;

        //        foreach (var p in paramsName)
        //        {
        //            com.Parameters.Add(p);
        //        }

        //        com.Connection.Open();
        //        com.ExecuteNonQuery();

        //        if (!string.IsNullOrEmpty(outParamName))
        //        {
        //            if (com.Parameters[outParamName].Value != null)
        //            {
        //                outParamValue = com.Parameters[outParamName].Value.ToString();
        //            }
        //        }

        //        com.Connection.Close();
        //    }

        //    return outParamValue;
        //}

        ///// <summary>
        ///// Gets the value.
        ///// </summary>
        ///// <param name="storedProcedureName">Name of the stored procedure.</param>
        ///// <param name="outParamName">Name of the out param.</param>
        ///// <param name="paramsName">Name of the params.</param>
        ///// <returns></returns>
        //public static string GetValue(string storedProcedureName, string outParamName, params OracleParameter[] paramsName)
        //{
        //    string strConnectionString = ConfigurationManager.ConnectionStrings["CIMA_DB"].ConnectionString;
        //    return GetValue(strConnectionString, storedProcedureName, outParamName, paramsName);
        //}

        ///// <summary>
        ///// Executes the non query.
        ///// </summary>
        ///// <param name="connectionString">The connection string.</param>
        ///// <param name="storedProcedureName">Name of the stored procedure.</param>
        ///// <param name="paramsName">Name of the params.</param>
        ///// <returns></returns>
        //public static int ExecuteNonQuery(string connectionString, string storedProcedureName, params OracleParameter[] paramsName)
        //{
        //    int affectedRows;
        //    using (var con = new OracleConnection(connectionString))
        //    {
        //        var com = con.CreateCommand();
        //        com.CommandType = CommandType.StoredProcedure;
        //        com.CommandText = storedProcedureName;

        //        if (paramsName != null)
        //        {
        //            foreach (var p in paramsName)
        //            {
        //                com.Parameters.Add(p);
        //            }
        //        }

        //        com.Connection.Open();

        //        affectedRows = com.ExecuteNonQuery();

        //        com.Connection.Close();
        //    }
        //    return affectedRows;
        //}

        ///// <summary>
        ///// Execute non query
        ///// </summary>
        ///// <param name="connectionString"></param>
        ///// <param name="query"></param>
        ///// <returns></returns>
        //public static int ExecuteNonQuery(string connectionString, string query)
        //{
        //    int affectedRows;
        //    using (var con = new OracleConnection(ChangeConnectionIfNotConnect(connectionString)))
        //    {
        //        var com = con.CreateCommand();
        //        com.CommandType = CommandType.Text;
        //        com.CommandText = query;

        //        com.Connection.Open();

        //        affectedRows = com.ExecuteNonQuery();

        //        com.Connection.Close();
        //    }
        //    return affectedRows;
        //}

        ///// <summary>
        ///// Executes the specified connection string.
        ///// </summary>
        ///// <param name="connectionString">The connection string.</param>
        ///// <param name="storedProcedureName">Name of the stored procedure.</param>
        ///// <param name="paramsName">Name of the params.</param>
        //public static void Execute(string connectionString, string storedProcedureName, params OracleParameter[] paramsName)
        //{
        //    using (var con = new OracleConnection(connectionString))
        //    {
        //        OracleCommand com = con.CreateCommand();
        //        com.CommandType = CommandType.StoredProcedure;
        //        com.CommandText = storedProcedureName;

        //        foreach (OracleParameter p in paramsName)
        //        {
        //            com.Parameters.Add(p);
        //        }

        //        com.Connection.Open();
        //        com.ExecuteNonQuery();

        //        com.Connection.Close();
        //    }

        //}

        ///// <summary>
        ///// Gets the data set.
        ///// </summary>
        ///// <param name="strConnectionString">The STR connection string.</param>
        ///// <param name="storedProcedureName">Name of the stored procedure.</param>
        ///// <param name="paramsName">Name of the params.</param>
        ///// <returns></returns>
        //public static DataSet GetDataSet(string strConnectionString, String storedProcedureName, params OracleParameter[] paramsName)
        //{
        //    var ds = new DataSet();

        //    using (var con = new OracleConnection(strConnectionString))
        //    {
        //        OracleCommand com = con.CreateCommand();
        //        com.CommandType = CommandType.StoredProcedure;
        //        com.CommandText = storedProcedureName;
        //        foreach (OracleParameter p in paramsName)
        //        {
        //            com.Parameters.Add(p);
        //        }
        //        com.Connection.Open();

        //        var da = new OracleDataAdapter(com);
        //        try
        //        {
        //            da.Fill(ds);
        //            com.Connection.Close();
        //        }
        //        catch (Exception e)
        //        {
        //            ds = null;
        //        }

        //    }
        //    return ds;
        //}

        ///// <summary>
        ///// Get DataSet From Query
        ///// </summary>
        ///// <param name="strConnectionString"></param>
        ///// <param name="query"></param>
        ///// <returns></returns>
        //public static DataSet GetDataSetFromQuery(string strConnectionString, String query)
        //{
        //    var ds = new DataSet();
        //    string _connectionString = ChangeConnectionIfNotConnect(strConnectionString);
        //    using (var con = new OracleConnection(ChangeConnectionIfNotConnect(strConnectionString)))
        //    {
        //        OracleCommand com = con.CreateCommand();
        //        com.CommandType = CommandType.Text;
        //        com.CommandText = query;
        //        com.Connection.Open();

        //        var da = new OracleDataAdapter(com);
        //        da.Fill(ds);
        //        com.Connection.Close();
        //    }
        //    return ds;
        //}

        ///// <summary>
        ///// Test Current DWH Connection 
        ///// </summary>
        ///// <param name="connectionString"></param>
        ///// <returns></returns>
        //private static string ChangeConnectionIfNotConnect(string connectionString)
        //{
        //    if (connectionString.Contains("10.62.131.135") || connectionString.Contains("10.62.132.132"))
        //    {
        //        if (!TestOracleConnection(connectionString))
        //        {
        //            connectionString = connectionString.Contains("10.62.131.135") ? connectionString.Replace("10.62.131.135", "10.62.132.132") : connectionString.Replace("10.62.132.132", "10.62.131.135");
        //            if (!TestOracleConnection(connectionString))
        //                return ConfigHelper.GetConnectionString("ProductionDWHConnectionString");
        //            else
        //                return connectionString;
        //        }
        //        else
        //            return connectionString;
        //    }
        //    return connectionString;
        //}

        ///// <summary>
        ///// Test Oracle Connection
        ///// </summary>
        ///// <param name="connectionString"></param>
        ///// <returns></returns>
        //private static bool TestOracleConnection(string connectionString)
        //{
        //    try
        //    {
        //        using (var connection = new OracleConnection(connectionString))
        //        {
        //            connection.Open();
        //            return true;
        //        }
        //    }
        //    catch (OracleException e)
        //    {
        //        switch (e.Number)
        //        {
        //            case 12545:
        //                return false;
        //            case 12541:
        //                return false;
        //            case 12170:
        //                return false;
        //            case 1034:
        //                return false;
        //            case 1033:
        //                return false;
        //            case 12537:
        //                return false;
        //            default:
        //                return true;
        //        }
        //    }
        //}

        ///// <summary>
        ///// Excute Text Query
        ///// </summary>
        ///// <param name="queryText"></param>
        ///// <param name="paramsName"></param>
        //public static void ExecuteTextQuery(string queryText, params OracleParameter[] paramsName)
        //{

        //    string strConnectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ToString();

        //    using (OracleConnection con = new OracleConnection(strConnectionString))
        //    {
        //        OracleCommand com = con.CreateCommand();
        //        com.CommandType = System.Data.CommandType.Text;
        //        com.CommandText = queryText;

        //        if (paramsName != null)
        //        {
        //            foreach (OracleParameter p in paramsName)
        //            {
        //                com.Parameters.Add(p);
        //            }
        //        }
        //        com.Connection.Open();
        //        com.ExecuteNonQuery();

        //        com.Connection.Close();
        //    }

        //}

        ///// <summary>
        ///// Gets the Data Table
        ///// </summary>
        ///// <param name="strConnectionString">the connection string</param>
        ///// <param name="query">the query</param>
        ///// <returns></returns>
        //public static DataTable GetDataTableFromQuery(string strConnectionString, String query)
        //{
        //    DataTable dt = null;
        //    string _connectionString = ChangeConnectionIfNotConnect(strConnectionString);
        //    if (_connectionString.ToLower().Contains("initial"))
        //        dt = ExecuteTextQuerySql(ChangeConnectionIfNotConnect(strConnectionString), query);
        //    else
        //    {
        //        using (OracleConnection myConnection = new OracleConnection(ChangeConnectionIfNotConnect(strConnectionString)))
        //        {
        //            myConnection.Open();
        //            OracleCommand ocmd = new OracleCommand();
        //            ocmd.Connection = myConnection;
        //            ocmd.CommandText = query;
        //            ocmd.CommandType = CommandType.Text;
        //            OracleDataAdapter da = new OracleDataAdapter(ocmd);
        //            dt = new DataTable();
        //            da.Fill(dt);

        //            myConnection.Close();
        //        }

        //    }
        //    return dt;
        //}

        ///// <summary>
        ///// Gets Dataset with Parameter Array as input
        ///// </summary>
        ///// <param name="strConnectionString">the Connection String</param>
        ///// <param name="storedProcedureName">the Procedure Name</param>
        ///// <param name="paramsName">the Param Name</param>
        ///// <returns>the Data Set</returns>
        //public static DataSet GetDataSetWithParameterArray(string strConnectionString, String storedProcedureName, OracleParameter[] paramsName)
        //{
        //    var ds = new DataSet();

        //    using (var con = new OracleConnection(strConnectionString))
        //    {
        //        OracleCommand com = con.CreateCommand();
        //        com.CommandType = CommandType.StoredProcedure;
        //        com.CommandText = storedProcedureName;
        //        foreach (OracleParameter p in paramsName)
        //        {
        //            com.Parameters.Add(p);
        //        }
        //        com.Connection.Open();

        //        var da = new OracleDataAdapter(com);
        //        da.Fill(ds);
        //        com.Connection.Close();
        //    }
        //    return ds;
        //}

        //#endregion

        #region " SQL Helper "

        /// <summary>
        /// Gets Data Set with Parameter Array Sql
        /// </summary>
        /// <param name="strConnectionString">the sql connection string</param>
        /// <param name="storedProcedureName">the procedure name</param>
        /// <param name="paramsName">the param name</param>
        /// <returns></returns>
        public static DataSet GetDataSetWithParameterArraySql(string strConnectionString, string storedProcedureName, params SqlParameter[] paramsName)
        {
            var ds = new DataSet();

            SqlConnection objcon = new SqlConnection(strConnectionString);
            SqlCommand objCommand = new SqlCommand(storedProcedureName, objcon);
            objCommand.CommandType = CommandType.StoredProcedure;
            objCommand.CommandTimeout = 0;

            foreach (SqlParameter p in paramsName)
            {
                objCommand.Parameters.Add(p);
            }

            SqlDataAdapter objDataAdapter = new SqlDataAdapter(objCommand);
            objDataAdapter.Fill(ds);
            objcon.Close();

            return ds;
        }

        public static DataSet GetDataSetSql(string strConnectionString, string storedProcedureName)
        {
            var ds = new DataSet();

            SqlConnection objcon = new SqlConnection(strConnectionString);
            SqlCommand objCommand = new SqlCommand(storedProcedureName, objcon);
            objCommand.CommandType = CommandType.StoredProcedure;
            objCommand.CommandTimeout = 0;

            SqlDataAdapter objDataAdapter = new SqlDataAdapter(objCommand);
            objDataAdapter.Fill(ds);
            objcon.Close();

            return ds;
        }

        /// <summary>
        /// Gets Data Table with Parameter Array Sql
        /// </summary>
        /// <param name="strConnectionString">the sql connection string</param>
        /// <param name="storedProcedureName">the procedure name</param>
        /// <param name="paramsName">the param name</param>
        /// <returns></returns>
        public static DataTable GetDataTableWithParameterArraySql(string strConnectionString, string storedProcedureName, params SqlParameter[] paramsName)
        {
            var dt = new DataTable();

            SqlConnection objcon = new SqlConnection(strConnectionString);
            SqlCommand objCommand = new SqlCommand(storedProcedureName, objcon);
            objCommand.CommandType = CommandType.StoredProcedure;
            objCommand.CommandTimeout = 0;

            foreach (SqlParameter p in paramsName)
            {
                objCommand.Parameters.Add(p);
            }

            SqlDataAdapter objDataAdapter = new SqlDataAdapter(objCommand);
            objDataAdapter.Fill(dt);
            objcon.Close();

            return dt;
        }

        /// <summary>
        /// Execute Non Query for Sql to get Output parameter
        /// </summary>
        /// <param name="strConnectionString"></param>
        /// <param name="storedProcedureName"></param>
        /// <param name="paramsName"></param>
        /// <returns></returns>
        public static string ExecuteNonQuerySql(string strConnectionString, string storedProcedureName, params SqlParameter[] paramsName)
        {
            var dt = new DataTable();

            SqlConnection objcon = new SqlConnection(strConnectionString);
            SqlCommand objCommand = new SqlCommand(storedProcedureName, objcon);
            objCommand.CommandType = CommandType.StoredProcedure;
            objCommand.CommandTimeout = 0;
            string _outputParameterName = string.Empty;
            string result = string.Empty;

            foreach (SqlParameter p in paramsName)
            {
                if (p.Direction == ParameterDirection.Output)
                {
                    _outputParameterName = p.ParameterName;
                }
                objCommand.Parameters.Add(p);
            }

            objcon.Open();
            result = objCommand.ExecuteNonQuery().ToString();
            if (!string.IsNullOrEmpty(_outputParameterName))
            {
                result = Convert.ToString(objCommand.Parameters[_outputParameterName].Value);
            }
            objcon.Close();

            return result;
        }

        /// <summary>
        /// Executes Text Query Sql
        /// </summary>
        /// <param name="strConnectionString"></param>
        /// <param name="storedProcedureName"></param>
        /// <param name="query"></param>
        /// <returns></returns>
        public static DataTable ExecuteTextQuerySql(string strConnectionString, string query)
        {
            var dt = new DataTable();

            SqlConnection objcon = new SqlConnection(strConnectionString);
            SqlCommand objCommand = new SqlCommand(query, objcon);
            if (objcon.State == ConnectionState.Closed)
            { objcon.Open(); }
            SqlDataAdapter da = new SqlDataAdapter(objCommand);
            da.Fill(dt);

            return dt;
        }

        #endregion

    }
}
