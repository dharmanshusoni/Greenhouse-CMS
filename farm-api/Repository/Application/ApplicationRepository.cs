using Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Application
{
    public class ApplicationRepository : IApplicationInterface
    {
        SqlConnection con;
        public ApplicationRepository()
        {
            con = new SqlConnection(Connections.Connect());
            SqlConnection.ClearAllPools();
        }

        public object GetApplicationType(int applicationTypeId)
        {
            Result result = new Result();
            string query = string.Format("GetApplicationType " + applicationTypeId);
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    result.message = "Data Found";
                    while (reader.Read())
                    {
                        Model.ApplicationType type = new Model.ApplicationType();
                        type.ApplicationTypeId = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        type.ApplicationTypes = (reader.GetValue(1) != null) ? reader.GetString(1) : string.Empty;
                        type.Icon = (reader.GetValue(2) != null) ? reader.GetString(2) : string.Empty;
                        
                        result.data.Add(type);
                    }
                }
                else
                {
                    result.message = "No Data Found";
                }
                con.Close();
            }
            result.data_name = "Application Type";
            result.status = 1;
            result.count = result.data.Count;
            return result;
        }
        
        public object GetApplicationDetail(int applicationId)
        {
            Result result = new Result();
            string query = string.Format("GetApplication " + applicationId);
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    result.message = "Data Found";
                    while (reader.Read())
                    {
                        Model.Application application = new Model.Application();
                        application.Application_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        application.Application_type = (reader.GetValue(1) != null) ? int.Parse(reader.GetInt32(1).ToString()) : 0;
                        application.Application_Name = (reader.GetValue(2) != null) ? reader.GetString(2) : string.Empty;
                        application.Application_Date = (reader.GetValue(3) != null) ? reader.GetDateTime(3) : DateTime.Now;
                        application.Application_Time = (reader.GetValue(4) != null) ? reader.GetString(4) : string.Empty;
                        application.Application_who_Assigned = (reader.GetValue(5) != null) ? int.Parse(reader.GetInt32(5).ToString()) : 0;
                        application.Application_Assigned_To = (reader.GetValue(6) != null) ? int.Parse(reader.GetInt32(6).ToString()) : 0;
                        application.Decease_Id = (reader.GetValue(7) != null) ? int.Parse(reader.GetInt32(7).ToString()) : 0;

                        result.data.Add(application);
                    }
                }
                else
                {
                    result.message = "No Data Found";
                }
                con.Close();
            }
            result.data_name = "Application";
            result.status = 1;
            result.count = result.data.Count;
            return result;
        }

        public object SaveApplication(Model.Application applicationData)
        {
            Result result = new Result();
            string query = string.Format("InUpDeApplication");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "In");
                cmd.Parameters.AddWithValue("@id", 0);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@Appilication_type", applicationData.Application_type);
                cmd.Parameters.AddWithValue("@Application_Name", applicationData.Application_Name.Trim());
                cmd.Parameters.AddWithValue("@Application_Date", DateTime.Now);
                cmd.Parameters.AddWithValue("@Application_Time", DateTime.Now.ToString("hh:mm tt"));
                cmd.Parameters.AddWithValue("@Appilication_who_Assigned", applicationData.Application_who_Assigned);
                cmd.Parameters.AddWithValue("@Application_Assigned_To", applicationData.Application_Assigned_To);
                cmd.Parameters.AddWithValue("@Decease_Id", applicationData.Decease_Id);
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.Application application = new Model.Application();
                        application.Application_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (application.Application_Id == -101)
                        {
                            result.message = "Application Already Exist";
                        }
                        else if (application.Application_Id == -102)
                        {
                            result.message = "InActive Application";
                        }
                        else
                        {
                            result.message = "Data Saved";
                            result.data.Add(application);
                        }
                    }
                }
                else
                {
                    result.message = "Unable to process request";
                }
                con.Close();
            }
            result.status = 1;
            result.count = result.data.Count;
            result.data_name = "Application";
            return result;
        }

        public object UpdateApplication(Model.Application applicationData)
        {
            Result result = new Result();
            string query = string.Format("InUpDeApplication");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "Up");
                cmd.Parameters.AddWithValue("@id", applicationData.Application_Id);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@Appilication_type", applicationData.Application_type);
                cmd.Parameters.AddWithValue("@Application_Name", applicationData.Application_Name.Trim());
                cmd.Parameters.AddWithValue("@Application_Date", DateTime.Now);
                cmd.Parameters.AddWithValue("@Application_Time", DateTime.Now.ToString("hh:mm tt"));
                cmd.Parameters.AddWithValue("@Appilication_who_Assigned", applicationData.Application_who_Assigned);
                cmd.Parameters.AddWithValue("@Application_Assigned_To", applicationData.Application_Assigned_To);
                cmd.Parameters.AddWithValue("@Decease_Id", applicationData.Decease_Id);
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.Application application = new Model.Application();
                        application.Application_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (application.Application_Id == -101)
                        {
                            result.message = "Application Already Exist";
                        }
                        else if (application.Application_Id == -102)
                        {
                            result.message = "InActive Application";
                        }
                        else if (application.Application_Id == -103)
                        {
                            result.message = "Application Not Exist";
                        }
                        else
                        {
                            result.message = "Data Updated";
                            result.data.Add(application);
                        }
                    }
                }
                else
                {
                    result.message = "Unable to process request";
                }
                con.Close();
            }
            result.status = 1;
            result.count = result.data.Count;
            result.data_name = "Application";
            return result;
        }
    }
}
