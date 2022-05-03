using Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Farmer
{
    public class FarmerRepository : IFarmerInterface
    {
        SqlConnection con;
        public FarmerRepository()
        {
            con = new SqlConnection(Connections.Connect());
            SqlConnection.ClearAllPools();
        }

        public object Login(Model.Farmer userData)
        {
            List<Result> Result = new List<Result>();
            Result result = new Result();
            string query = string.Format("VerifyUser '" + userData.Username + "','" + userData.Password + "'");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    result.message = "Data Found";
                    while (reader.Read())
                    {
                        Model.Farmer user = new Model.Farmer();
                        user.id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        //user.Username = (reader.GetValue(1) != null) ? reader.GetString(1) : string.Empty;
                        //user.Password = (reader.GetValue(2) != null) ? reader.GetString(2) : string.Empty;
                        if (user.id == -101)
                        {
                            result.message = "No User Found";
                        }
                        else if (user.id == -102)
                        {
                            result.message = "InActive User";
                        }
                        else
                        {
                            result.data.Add(user);
                        }
                    }
                }
                else
                {
                    result.message = "No Data Found";
                }
                con.Close();
            }
            result.status = 1;
            result.count = result.data.Count;
            result.data_name = "Login";
            //result.generated_on = Base.getInstance().GetEpochOf(DateTimeOffset.Now.UtcDateTime);
            return result;
        }

        public object GetProfile(int userId)
        {
            Result result = new Result();
            string query = string.Format("GetFarmerUserProfile "+userId);
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    result.message = "Data Found";
                    while (reader.Read())
                    {
                        Model.Farmer user = new Model.Farmer();
                        user.id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        user.FirstName = (reader.GetValue(1) != null) ? reader.GetString(1) : string.Empty;
                        user.LastName = (reader.GetValue(2) != null) ? reader.GetString(2) : string.Empty;
                        user.Username = (reader.GetValue(3) != null) ? reader.GetString(3) : string.Empty;
                        user.Password = (reader.GetValue(4) != null) ? reader.GetString(4) : string.Empty;
                        user.Image = (reader.IsDBNull(5)) ? string.Empty : reader.GetString(5);
                        user.Phone = (reader.IsDBNull(6)) ? string.Empty : reader.GetString(6);

                        if (userId == 0)
                        {
                            result.data_name = "User Profile List";
                        }
                        else
                        {
                            result.data_name = "User Profile Detail";
                        }
                        result.data.Add(user);
                    }
                }
                else
                {
                    result.message = "No Data Found";
                }
                con.Close();
            }
            result.status = 1;
            result.count = result.data.Count;
            return result;
        }

        public object GetUserType(int userTypeId)
        {
            Result result = new Result();
            string query = string.Format("GetUserType " + userTypeId);
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    result.message = "Data Found";
                    while (reader.Read())
                    {
                        Model.UserType user = new Model.UserType();
                        user.UserTypeId = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        user.UserTypeName = (reader.GetValue(1) != null) ? reader.GetString(1) : string.Empty;
                        if (user.UserTypeId == 0)
                        {
                            result.data_name = "User Type List";
                        }
                        else
                        {
                            result.data_name = "User Type Detail";
                        }
                        result.data.Add(user);
                    }
                }
                else
                {
                    result.message = "No Data Found";
                }
                con.Close();
            }
            result.status = 1;
            result.count = result.data.Count;
            return result;
        }

        public object SaveProfile(Model.Farmer userData)
        {
            Result result = new Result();
            string query = string.Format("InUpDeFarmerProfile");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "In");
                cmd.Parameters.AddWithValue("@id", 0);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@Farmer_email_id", ((userData.Username)).Trim());
                cmd.Parameters.AddWithValue("@Farmer_First_name", ((userData.FirstName)).Trim());
                cmd.Parameters.AddWithValue("@Farmer_Last_name", ((userData.LastName)).Trim());
                cmd.Parameters.AddWithValue("@Password", ((userData.Password)).Trim());
                cmd.Parameters.AddWithValue("@Farmer_Image", ((userData.Image)).Trim());
                cmd.Parameters.AddWithValue("@Farmer_Phone", ((userData.Phone)).Trim());

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
                        Model.Farmer user = new Model.Farmer();
                        user.id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (user.id == -101)
                        {
                            result.message = "User Already Exist";
                        }
                        else if (user.id == -102)
                        {
                            result.message = "InActive User";
                        }
                        else
                        {
                            result.message = "Data Saved";
                            result.data.Add(user);
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
            result.data_name = "UserProfile";
            return result;
        }

        public object UpdateProfile(Model.Farmer userData)
        {
            Result result = new Result();
            string query = string.Format("InUpDeFarmerProfile");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "Up");
                cmd.Parameters.AddWithValue("@id", userData.id);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@Farmer_email_id", ((userData.Username)).Trim());
                cmd.Parameters.AddWithValue("@Farmer_First_name", ((userData.FirstName)).Trim());
                cmd.Parameters.AddWithValue("@Farmer_Last_name", ((userData.LastName)).Trim());
                cmd.Parameters.AddWithValue("@Password", ((userData.Password)).Trim());
                cmd.Parameters.AddWithValue("@Farmer_Image", ((userData.Image)).Trim());
                cmd.Parameters.AddWithValue("@Farmer_Phone", ((userData.Phone)).Trim());

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
                        Model.Farmer user = new Model.Farmer();
                        user.id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (user.id == -101)
                        {
                            result.message = "User Already Exist";
                        }
                        else if (user.id == -102)
                        {
                            result.message = "InActive User";
                        }
                        else if (user.id == -103)
                        {
                            result.message = "User Not Exist";
                        }
                        else
                        {
                            result.message = "Data Updated";
                            result.data.Add(user);
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
            result.data_name = "UserProfile";
            return result;
        }

    }
}
