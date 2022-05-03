using Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Benificial
{
    public class BenificialRepository : IBenificialInterface
    {
        SqlConnection con;
        public BenificialRepository()
        {
            con = new SqlConnection(Connections.Connect());
            SqlConnection.ClearAllPools();
        }

        public object GetBenificialDetail(int benificialId)
        {
            Result result = new Result();
            string query = string.Format("GetBenificials " + benificialId);
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    result.message = "Data Found";
                    while (reader.Read())
                    {
                        Model.Benificials benificials = new Model.Benificials();
                        benificials.Benificials_ID = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        benificials.Benificial_Name = (reader.GetValue(1) != null) ? reader.GetString(1) : string.Empty;
                        benificials.Benificial_Description = (reader.GetValue(2) != null) ? reader.GetString(2) : string.Empty;
                        benificials.Benificial_Image = (reader.GetValue(3) != null) ? reader.GetString(3) : string.Empty;

                        result.data.Add(benificials);
                    }
                }
                else
                {
                    result.message = "No Data Found";
                }
                con.Close();
            }
            result.data_name = "Benificials";
            result.status = 1;
            result.count = result.data.Count;
            return result;
        }

        public object SaveBenificial(Model.Benificials benificialData)
        {
            Result result = new Result();
            string query = string.Format("InUpDeBenificials");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "In");
                cmd.Parameters.AddWithValue("@id", 0);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@Benificial_Name", benificialData.Benificial_Name.Trim());
                cmd.Parameters.AddWithValue("@Benificial_Description", benificialData.Benificial_Description.Trim());
                cmd.Parameters.AddWithValue("@Benificial_Image", benificialData.Benificial_Image.Trim());
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.Benificials benificials = new Model.Benificials();
                        benificials.Benificials_ID = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (benificials.Benificials_ID == -101)
                        {
                            result.message = "Benificial Already Exist";
                        }
                        else if (benificials.Benificials_ID == -102)
                        {
                            result.message = "InActive Benificial";
                        }
                        else
                        {
                            result.message = "Data Saved";
                            result.data.Add(benificials);
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
            result.data_name = "Benificial";
            return result;
        }

        public object UpdateBenificial(Model.Benificials benificialData)
        {
            Result result = new Result();
            string query = string.Format("InUpDeBenificials");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "Up");
                cmd.Parameters.AddWithValue("@id", benificialData.Benificials_ID);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@Benificial_Name", benificialData.Benificial_Name.Trim());
                cmd.Parameters.AddWithValue("@Benificial_Description", benificialData.Benificial_Description.Trim());
                cmd.Parameters.AddWithValue("@Benificial_Image", benificialData.Benificial_Image.Trim());
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.Benificials benificials = new Model.Benificials();
                        benificials.Benificials_ID = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (benificials.Benificials_ID == -101)
                        {
                            result.message = "Benificial Already Exist";
                        }
                        else if (benificials.Benificials_ID == -102)
                        {
                            result.message = "InActive Benificial";
                        }
                        else if (benificials.Benificials_ID == -103)
                        {
                            result.message = "Benificial Not Exist";
                        }
                        else
                        {
                            result.message = "Data Updated";
                            result.data.Add(benificials);
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
            result.data_name = "Benificial";
            return result;
        }
    }
}
