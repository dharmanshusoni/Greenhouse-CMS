using Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Pest
{
    public class PestRepository : IPestInterface
    {
        SqlConnection con;
        public PestRepository()
        {
            con = new SqlConnection(Connections.Connect());
            SqlConnection.ClearAllPools();
        }

        public object GetPestDetail(int pestId)
        {
            Result result = new Result();
            string query = string.Format("GetPest " + pestId);
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    result.message = "Data Found";
                    while (reader.Read())
                    {
                        Model.Pest pest = new Model.Pest();
                        pest.Pest_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        pest.Pest_Name = (reader.GetValue(1) != null) ? reader.GetString(1) : string.Empty;
                        pest.Pest_Image = (reader.GetValue(2) != null) ? reader.GetString(2) : string.Empty;
                        pest.Pest_Details = (reader.GetValue(3) != null) ? reader.GetString(3) : string.Empty;
                        pest.No_Acerage = (reader.GetValue(4) != null) ? int.Parse(reader.GetInt32(4).ToString()) : 0;

                        result.data.Add(pest);
                    }
                }
                else
                {
                    result.message = "No Data Found";
                }
                con.Close();
            }
            result.data_name = "Pest";
            result.status = 1;
            result.count = result.data.Count;
            return result;
        }

        public object SavePest(Model.Pest pestData)
        {
            Result result = new Result();
            string query = string.Format("InUpDePests");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "In");
                cmd.Parameters.AddWithValue("@id", 0);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@Pest_Name", pestData.Pest_Name.Trim());
                cmd.Parameters.AddWithValue("@Pest_Image", pestData.Pest_Image.Trim());
                cmd.Parameters.AddWithValue("@Pest_Details", pestData.Pest_Details.Trim());
                cmd.Parameters.AddWithValue("@No_Acerage", pestData.No_Acerage);
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.Pest pest = new Model.Pest();
                        pest.Pest_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (pest.Pest_Id == -101)
                        {
                            result.message = "Pest Already Exist";
                        }
                        else if (pest.Pest_Id == -102)
                        {
                            result.message = "InActive Pest";
                        }
                        else
                        {
                            result.message = "Data Saved";
                            result.data.Add(pest);
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
            result.data_name = "Pest";
            return result;
        }

        public object UpdatePest(Model.Pest pestData)
        {
            Result result = new Result();
            string query = string.Format("InUpDePests");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "Up");
                cmd.Parameters.AddWithValue("@id", pestData.Pest_Id);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@Pest_Name", pestData.Pest_Name.Trim());
                cmd.Parameters.AddWithValue("@Pest_Image", pestData.Pest_Image.Trim());
                cmd.Parameters.AddWithValue("@Pest_Details", pestData.Pest_Details.Trim());
                cmd.Parameters.AddWithValue("@No_Acerage", pestData.No_Acerage);
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.Pest pest = new Model.Pest();
                        pest.Pest_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (pest.Pest_Id == -101)
                        {
                            result.message = "Pest Already Exist";
                        }
                        else if (pest.Pest_Id == -102)
                        {
                            result.message = "InActive Pest";
                        }
                        else if (pest.Pest_Id == -103)
                        {
                            result.message = "Pest Not Exist";
                        }
                        else
                        {
                            result.message = "Data Updated";
                            result.data.Add(pest);
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
            result.data_name = "Pest";
            return result;
        }
    }
}
