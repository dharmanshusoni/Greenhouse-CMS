using Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.PestIntensity
{
    public class PestIntensityRepository : IPestIntensityInterface
    {
        SqlConnection con;
        public PestIntensityRepository()
        {
            con = new SqlConnection(Connections.Connect());
            SqlConnection.ClearAllPools();
        }

        public object GetPestIntensityDetail(int pestIntensityId)
        {
            Result result = new Result();
            string query = string.Format("GetPestIntensity " + pestIntensityId);
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    result.message = "Data Found";
                    while (reader.Read())
                    {
                        Model.PestIntensity crop = new Model.PestIntensity();
                        crop.Crops_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        crop.Crop_Id = (reader.IsDBNull(1)) ? 0 : int.Parse(reader.GetInt32(1).ToString());
                        crop.No_Acerage = (reader.GetValue(2) != null) ? int.Parse(reader.GetInt32(2).ToString()) : 0;
                        crop.Intensity = (reader.GetValue(3) != null) ? int.Parse(reader.GetInt32(3).ToString()) : 0;
                        crop.Farmer_Id = (reader.GetValue(4) != null) ? int.Parse(reader.GetInt32(4).ToString()) : 0;
                        crop.Farm_Id = (reader.GetValue(5) != null) ? int.Parse(reader.GetInt32(5).ToString()) : 0;
                        crop.Pest_Id = (reader.GetValue(6) != null) ? int.Parse(reader.GetInt32(6).ToString()) : 0;

                        result.data.Add(crop);
                    }
                }
                else
                {
                    result.message = "No Data Found";
                }
                con.Close();
            }
            result.data_name = "Crop";
            result.status = 1;
            result.count = result.data.Count;
            return result;
        }

        public object SavePestIntensity(Model.PestIntensity pestIntensityData)
        {
            Result result = new Result();
            string query = string.Format("InUpDePestIntensity");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "In");
                cmd.Parameters.AddWithValue("@id", 0);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@No_Acerage", pestIntensityData.No_Acerage);
                cmd.Parameters.AddWithValue("@Intensity", pestIntensityData.Intensity);
                cmd.Parameters.AddWithValue("@Farmer_Id", pestIntensityData.Farmer_Id);
                cmd.Parameters.AddWithValue("@Farm_Id", pestIntensityData.Farm_Id);
                cmd.Parameters.AddWithValue("@Pest_Id", pestIntensityData.Pest_Id);
                cmd.Parameters.AddWithValue("@Crop_Id", pestIntensityData.Crop_Id);

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.PestIntensity crop = new Model.PestIntensity();
                        crop.Crops_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (crop.Crops_Id == -101)
                        {
                            result.message = "Crop Already Exist";
                        }
                        else if (crop.Crops_Id == -102)
                        {
                            result.message = "InActive Pest";
                        }
                        else
                        {
                            result.message = "Data Saved";
                            result.data.Add(crop);
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
            result.data_name = "Crop";
            return result;
        }

        public object UpdatePestIntensity(Model.PestIntensity pestIntensityData)
        {
            Result result = new Result();
            string query = string.Format("InUpDePestIntensity");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "Up");
                cmd.Parameters.AddWithValue("@id", pestIntensityData.Crops_Id);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@No_Acerage", pestIntensityData.No_Acerage);
                cmd.Parameters.AddWithValue("@Intensity", pestIntensityData.Intensity);
                cmd.Parameters.AddWithValue("@Farmer_Id", pestIntensityData.Farmer_Id);
                cmd.Parameters.AddWithValue("@Farm_Id", pestIntensityData.Farm_Id);
                cmd.Parameters.AddWithValue("@Pest_Id", pestIntensityData.Pest_Id);
                cmd.Parameters.AddWithValue("@Crop_Id", pestIntensityData.Crop_Id);

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.PestIntensity crop = new Model.PestIntensity();
                        crop.Crops_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (crop.Crops_Id == -101)
                        {
                            result.message = "Crop Already Exist";
                        }
                        else if (crop.Crops_Id == -102)
                        {
                            result.message = "InActive Crop";
                        }
                        else if (crop.Crops_Id == -103)
                        {
                            result.message = "Crop Not Exist";
                        }
                        else
                        {
                            result.message = "Data Updated";
                            result.data.Add(crop);
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
            result.data_name = "Crop";
            return result;
        }
    }
}
