using Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Farm
{
    public class FarmRepository : IFarmInterface
    {
        SqlConnection con;
        public FarmRepository()
        {
            // Local
            //con = new SqlConnection("Data Source=LAPTOP-7Q3NO3O1\\SQLEXPRESS;Initial Catalog=Farm;Trusted_Connection=True;");

            // Live
             con = new SqlConnection("Data Source=SQL8001.site4now.net;Initial Catalog=db_a85a28_scouts;User Id=db_a85a28_scouts_admin;Password=scouts@123;");
            SqlConnection.ClearAllPools();
        }

        public object GetFarmsForFarmer(int farmerId)
        {
            Result result = new Result();
            string query = string.Format("GetFarmsByFarmerId " + farmerId);
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    result.message = "Data Found";
                    while (reader.Read())
                    {
                        Model.Farm farm = new Model.Farm();
                        farm.Farm_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        farm.Farmer_Id = (reader.GetValue(1) != null) ? int.Parse(reader.GetInt32(1).ToString()) : 0;
                        farm.Farm_Name = (reader.GetValue(2) != null) ? reader.GetString(2) : string.Empty;
                        farm.Farm_Address = (reader.GetValue(3) != null) ? reader.GetString(3) : string.Empty;
                        farm.Farm_Address_2 = (reader.GetValue(4) != null) ? reader.GetString(4) : string.Empty;
                        farm.City = (reader.GetValue(5) != null) ? reader.GetString(5) : string.Empty;
                        farm.State = (reader.GetValue(6) != null) ? reader.GetString(6) : string.Empty;
                        farm.Country = (reader.GetValue(7) != null) ? reader.GetString(7) : string.Empty;
                        farm.PostalCode = (reader.GetValue(8) != null) ? reader.GetString(8) : string.Empty;
                        
                        result.data.Add(farm);
                    }
                }
                else
                {
                    result.message = "No Data Found";
                }
                con.Close();
            }
            result.data_name = "Farm";
            result.status = 1;
            result.count = result.data.Count;
            return result;
        }

        public object GetFarmDetail(int farmId)
        {
            Result result = new Result();
            string query = string.Format("GetFarmsByFarmId " + farmId);
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    result.message = "Data Found";
                    while (reader.Read())
                    {
                        Model.Farm farm = new Model.Farm();
                        farm.Farm_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        farm.Farmer_Id = (reader.GetValue(1) != null) ? int.Parse(reader.GetInt32(1).ToString()) : 0;
                        farm.Farm_Name = (reader.GetValue(2) != null) ? reader.GetString(2) : string.Empty;
                        farm.Farm_Address = (reader.GetValue(3) != null) ? reader.GetString(3) : string.Empty;
                        farm.Farm_Address_2 = (reader.GetValue(4) != null) ? reader.GetString(4) : string.Empty;
                        farm.City = (reader.GetValue(5) != null) ? reader.GetString(5) : string.Empty;
                        farm.State = (reader.GetValue(6) != null) ? reader.GetString(6) : string.Empty;
                        farm.Country = (reader.GetValue(7) != null) ? reader.GetString(7) : string.Empty;
                        farm.PostalCode = (reader.GetValue(8) != null) ? reader.GetString(8) : string.Empty;

                        result.data.Add(farm);
                    }
                }
                else
                {
                    result.message = "No Data Found";
                }
                con.Close();
            }
            result.data_name = "Farm";
            result.status = 1;
            result.count = result.data.Count;
            return result;
        }

        public object SaveFarm(Model.Farm farmData)
        {
            Result result = new Result();
            string query = string.Format("InUpDeFarm");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "In");
                cmd.Parameters.AddWithValue("@id", 0);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@Farm_Name", ((farmData.Farm_Name)).Trim());
                cmd.Parameters.AddWithValue("@Farm_Address", ((farmData.Farm_Address)).Trim());
                cmd.Parameters.AddWithValue("@Farm_Address_2", ((farmData.Farm_Address_2)).Trim());
                cmd.Parameters.AddWithValue("@City", ((farmData.City)).Trim());
                cmd.Parameters.AddWithValue("@State", ((farmData.State)).Trim());
                cmd.Parameters.AddWithValue("@Country", ((farmData.Country)).Trim());
                cmd.Parameters.AddWithValue("@PostalCode", ((farmData.PostalCode)).Trim());
                cmd.Parameters.AddWithValue("@Farmer_Id", farmData.Farmer_Id);

                //var returnParameter = cmd.Parameters.Add("@ErrorCode", SqlDbType.Int);
                //returnParameter.Direction = ParameterDirection.ReturnValue;

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                //var Result = cmd.ExecuteNonQuery();
                //int isExist = (int)cmd.Parameters["@ErrorCode"].Value;

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.Farm farm = new Model.Farm();
                        farm.Farm_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (farm.Farm_Id == -101)
                        {
                            result.message = "Farm Already Exist";
                        }
                        else if (farm.Farm_Id == -102)
                        {
                            result.message = "InActive Farm";
                        }
                        else
                        {
                            result.message = "Data Saved";
                            result.data.Add(farm);
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
            result.data_name = "Farm";
            return result;
        }

        public object UpdateFarm(Model.Farm farmData)
        {
            Result result = new Result();
            string query = string.Format("InUpDeFarm");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "Up");
                cmd.Parameters.AddWithValue("@id", farmData.Farm_Id);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@Farm_Name", ((farmData.Farm_Name)).Trim());
                cmd.Parameters.AddWithValue("@Farm_Address", ((farmData.Farm_Address)).Trim());
                cmd.Parameters.AddWithValue("@Farm_Address_2", ((farmData.Farm_Address_2)).Trim());
                cmd.Parameters.AddWithValue("@City", ((farmData.City)).Trim());
                cmd.Parameters.AddWithValue("@State", ((farmData.State)).Trim());
                cmd.Parameters.AddWithValue("@Country", ((farmData.Country)).Trim());
                cmd.Parameters.AddWithValue("@PostalCode", ((farmData.PostalCode)).Trim());
                cmd.Parameters.AddWithValue("@Farmer_Id", farmData.Farmer_Id);

                //var returnParameter = cmd.Parameters.Add("@ErrorCode", SqlDbType.Int);
                //returnParameter.Direction = ParameterDirection.ReturnValue;

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                //var Result = cmd.ExecuteNonQuery();
                //int isExist = (int)cmd.Parameters["@ErrorCode"].Value;

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.Farm farm = new Model.Farm();
                        farm.Farm_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (farm.Farm_Id == -101)
                        {
                            result.message = "Farm Already Exist";
                        }
                        else if (farm.Farm_Id == -102)
                        {
                            result.message = "InActive Farm";
                        }
                        else if (farm.Farm_Id == -103)
                        {
                            result.message = "Farm Not Exist";
                        }
                        else
                        {
                            result.message = "Data Updated";
                            result.data.Add(farm);
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
            result.data_name = "Farm";
            return result;
        }
    }
}
