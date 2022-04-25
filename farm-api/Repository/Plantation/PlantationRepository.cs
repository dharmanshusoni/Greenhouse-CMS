using Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Plantation
{
    public class PlantationRepository : IPlantationInterface
    {
        SqlConnection con;
        public PlantationRepository()
        {
            //Local
            con = new SqlConnection("Data Source=LAPTOP-7Q3NO3O1\\SQLEXPRESS;Initial Catalog=Farm;Trusted_Connection=True;");

            //Live
            //con = new SqlConnection("Data Source=SQL8001.site4now.net;Initial Catalog=db_a85a28_scouts;User Id=db_a85a28_scouts_admin;Password=scouts@123;");
            SqlConnection.ClearAllPools();
        }

        public object GetPlantationDetail(int plantationId)
        {
            Result result = new Result();
            string query = string.Format("GetPlantation " + plantationId);
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    result.message = "Data Found";
                    while (reader.Read())
                    {
                        Model.Plantation plantation = new Model.Plantation();
                        plantation.Plantation_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        plantation.Plantation_Date = (reader.GetValue(1) != null) ? reader.GetDateTime(1) : DateTime.Now;
                        plantation.Cleanout_Date= (reader.GetValue(2) != null) ? reader.GetDateTime(2) : DateTime.Now;
                        plantation.No_Acerage = (reader.GetValue(3) != null) ? int.Parse(reader.GetInt32(3).ToString()) : 0;
                        plantation.Crop_Id = (reader.GetValue(4) != null) ? int.Parse(reader.GetInt32(4).ToString()) : 0;

                        result.data.Add(plantation);
                    }
                }
                else
                {
                    result.message = "No Data Found";
                }
                con.Close();
            }
            result.data_name = "Plantation";
            result.status = 1;
            result.count = result.data.Count;
            return result;
        }

        public object SavePlantation(Model.Plantation plantationData)
        {
            Result result = new Result();
            string query = string.Format("InUpDePlantation");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "In");
                cmd.Parameters.AddWithValue("@id", 0);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@Plantation_Date", plantationData.Plantation_Date.ToString("MM/dd/yyyy"));
                cmd.Parameters.AddWithValue("@Cleanout_Date", plantationData.Cleanout_Date.ToString("MM/dd/yyyy"));
                cmd.Parameters.AddWithValue("@No_Acerage", plantationData.No_Acerage);
                cmd.Parameters.AddWithValue("@Crop_Id", plantationData.Crop_Id);
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.Plantation plantation = new Model.Plantation();
                        plantation.Plantation_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (plantation.Plantation_Id == -101)
                        {
                            result.message = "Plantation Already Exist";
                        }
                        else if (plantation.Plantation_Id == -102)
                        {
                            result.message = "InActive Plantation";
                        }
                        else
                        {
                            result.message = "Data Saved";
                            result.data.Add(plantation);
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
            result.data_name = "Plantation";
            return result;
        }

        public object UpdatePlantation(Model.Plantation plantationData)
        {
            Result result = new Result();
            string query = string.Format("InUpDePlantation");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "Up");
                cmd.Parameters.AddWithValue("@id", plantationData.Plantation_Id);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@Plantation_Date", plantationData.Plantation_Date.ToString("MM/dd/yyyy"));
                cmd.Parameters.AddWithValue("@Cleanout_Date", plantationData.Cleanout_Date.ToString("MM/dd/yyyy"));
                cmd.Parameters.AddWithValue("@No_Acerage", plantationData.No_Acerage);
                cmd.Parameters.AddWithValue("@Crop_Id", plantationData.Crop_Id);
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.Plantation plantation= new Model.Plantation();
                        plantation.Plantation_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (plantation.Plantation_Id == -101)
                        {
                            result.message = "Plantation Already Exist";
                        }
                        else if (plantation.Plantation_Id == -102)
                        {
                            result.message = "InActive Plantation";
                        }
                        else if (plantation.Plantation_Id == -103)
                        {
                            result.message = "Plantation Not Exist";
                        }
                        else
                        {
                            result.message = "Data Updated";
                            result.data.Add(plantation);
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
            result.data_name = "Plantation";
            return result;
        }
    }
}
