using Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Decease
{
    public class DeceaseRepository : IDeceaseInterface
    {
        SqlConnection con;
        public DeceaseRepository()
        {
            con = new SqlConnection(Connections.Connect());
            SqlConnection.ClearAllPools();
        }

        public object GetDeceaseDetail(int deceaseId)
        {
            Result result = new Result();
            string query = string.Format("GetDecease " + deceaseId);
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    result.message = "Data Found";
                    while (reader.Read())
                    {
                        Model.Decease decease = new Model.Decease();
                        decease.Decease_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        decease.Decease_Name = (reader.GetValue(1) != null) ? reader.GetString(1) : string.Empty;
                        decease.Crop_Id = (reader.GetValue(2) != null) ? int.Parse(reader.GetInt32(2).ToString()) : 0;
                        decease.Stickey_Card_Updated = (reader.GetValue(3) != null) ? reader.GetBoolean(3) : false;

                        result.data.Add(decease);
                    }
                }
                else
                {
                    result.message = "No Data Found";
                }
                con.Close();
            }
            result.data_name = "Decease";
            result.status = 1;
            result.count = result.data.Count;
            return result;
        }

        public object SaveDecease(Model.Decease deceaseData)
        {
            Result result = new Result();
            string query = string.Format("InUpDeDecease");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "In");
                cmd.Parameters.AddWithValue("@id", 0);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@Decease_Name", deceaseData.Decease_Name.Trim());
                cmd.Parameters.AddWithValue("@Crop_Id", deceaseData.Crop_Id);
                cmd.Parameters.AddWithValue("@Stickey_Card_Updated", deceaseData.Stickey_Card_Updated);
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.Decease decease = new Model.Decease();
                        decease.Decease_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (decease.Decease_Id == -101)
                        {
                            result.message = "Decease Already Exist";
                        }
                        else if (decease.Decease_Id == -102)
                        {
                            result.message = "InActive Decease";
                        }
                        else
                        {
                            result.message = "Data Saved";
                            result.data.Add(decease);
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
            result.data_name = "Decease";
            return result;
        }

        public object UpdateDecease(Model.Decease deceaseData)
        {
            Result result = new Result();
            string query = string.Format("InUpDeDecease");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "Up");
                cmd.Parameters.AddWithValue("@id", deceaseData.Decease_Id);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@Decease_Name", deceaseData.Decease_Name.Trim());
                cmd.Parameters.AddWithValue("@Crop_Id", deceaseData.Crop_Id);
                cmd.Parameters.AddWithValue("@Stickey_Card_Updated", deceaseData.Stickey_Card_Updated);
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.Decease decease = new Model.Decease();
                        decease.Decease_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (decease.Decease_Id == -101)
                        {
                            result.message = "Decease Already Exist";
                        }
                        else if (decease.Decease_Id == -102)
                        {
                            result.message = "InActive Decease";
                        }
                        else if (decease.Decease_Id == -103)
                        {
                            result.message = "Decease Not Exist";
                        }
                        else
                        {
                            result.message = "Data Updated";
                            result.data.Add(decease);
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
            result.data_name = "Decease";
            return result;
        }
    }
}
