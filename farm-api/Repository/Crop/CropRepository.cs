﻿using Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Crop
{
    public class CropRepository : ICropInterface
    {
        SqlConnection con;
        public CropRepository()
        {
            con = new SqlConnection(Connections.Connect());
            SqlConnection.ClearAllPools();
        }

        public object GetCropDetail(int cropId)
        {
            Result result = new Result();
            string query = string.Format("GetCrops " + cropId);
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    result.message = "Data Found";
                    while (reader.Read())
                    {
                        Model.Crop crop = new Model.Crop();
                        crop.Crop_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        crop.Crop_Name = (reader.GetValue(1) != null) ? reader.GetString(1) : string.Empty;
                        crop.Crop_Image= (reader.GetValue(2) != null) ? reader.GetString(2) : string.Empty;

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

        public object SaveCrop(Model.Crop cropData)
        {
            Result result = new Result();
            string query = string.Format("InUpDeCrops");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "In");
                cmd.Parameters.AddWithValue("@id", 0);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@Crop_Name", cropData.Crop_Name.Trim());
                cmd.Parameters.AddWithValue("@Crop_Image", cropData.Crop_Image.Trim());
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.Crop crop = new Model.Crop();
                        crop.Crop_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (crop.Crop_Id == -101)
                        {
                            result.message = "Crop Already Exist";
                        }
                        else if (crop.Crop_Id == -102)
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

        public object UpdateCrop(Model.Crop cropData)
        {
            Result result = new Result();
            string query = string.Format("InUpDeCrops");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "Up");
                cmd.Parameters.AddWithValue("@id", cropData.Crop_Id);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@Crop_Name", cropData.Crop_Name.Trim());
                cmd.Parameters.AddWithValue("@Crop_Image", cropData.Crop_Image.Trim());

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.Crop crop = new Model.Crop();
                        crop.Crop_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (crop.Crop_Id == -101)
                        {
                            result.message = "Crop Already Exist";
                        }
                        else if (crop.Crop_Id == -102)
                        {
                            result.message = "InActive Crop";
                        }
                        else if (crop.Crop_Id == -103)
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
