﻿using Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.User
{
    public class UserRepository : IUserInterface
    {
        SqlConnection con;
        public UserRepository()
        {
            con = new SqlConnection(Connections.Connect());
            SqlConnection.ClearAllPools();
        }

        public object Login(Model.Users userData)
        {
            List<Result> Result = new List<Result>();
            Result result = new Result();
            string query = string.Format("VerifyUser '" + userData.User_Email_Id + "','" + userData.Password + "'");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    result.message = "Data Found";
                    while (reader.Read())
                    {
                        Model.Users user = new Model.Users();
                        user.User_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        //user.Username = (reader.GetValue(1) != null) ? reader.GetString(1) : string.Empty;
                        //user.Password = (reader.GetValue(2) != null) ? reader.GetString(2) : string.Empty;
                        if (user.User_Id == -101)
                        {
                            result.message = "No User Found";
                        }
                        else if (user.User_Id == -102)
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

        public object GetUser(int farmerId,int userId)
        {
            Result result = new Result();
            string query = string.Format("GetUserProfile " + farmerId +","+ userId);
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    result.message = "Data Found";
                    while (reader.Read())
                    {
                        Model.Users user = new Model.Users();
                        user.User_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        user.User_First_Name = (reader.GetValue(1) != null) ? reader.GetString(1) : string.Empty;
                        user.User_Last_Name = (reader.GetValue(2) != null) ? reader.GetString(2) : string.Empty;
                        user.User_Email_Id = (reader.GetValue(3) != null) ? reader.GetString(3) : string.Empty;
                        user.Password = (reader.GetValue(4) != null) ? reader.GetString(4) : string.Empty;
                        user.User_Image = (reader.IsDBNull(5)) ? string.Empty : reader.GetString(5);
                        user.User_Phone = (reader.IsDBNull(6)) ? string.Empty : reader.GetString(6);
                        user.UserType_Id = (reader.GetValue(7) != null) ? int.Parse(reader.GetInt32(7).ToString()) : 0;
                        user.Farmer_Id  = (reader.GetValue(8) != null) ? int.Parse(reader.GetInt32(8).ToString()) : 0;
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

        public object SaveUser(Model.Users userData)
        {
            Result result = new Result();
            string query = string.Format("InUpDeUserProfile");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "In");
                cmd.Parameters.AddWithValue("@id", 0);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@User_First_Name", ((userData.User_First_Name)).Trim());
                cmd.Parameters.AddWithValue("@User_Last_Name", ((userData.User_Last_Name)).Trim());
                cmd.Parameters.AddWithValue("@User_Email_Id", ((userData.User_Email_Id)).Trim());
                cmd.Parameters.AddWithValue("@Password", ((userData.Password)).Trim());
                cmd.Parameters.AddWithValue("@User_Image", ((userData.User_Image)).Trim());
                cmd.Parameters.AddWithValue("@User_Phone", ((userData.User_Phone)).Trim());
                cmd.Parameters.AddWithValue("@UserType_Id", ((userData.UserType_Id)));
                cmd.Parameters.AddWithValue("@Farmer_Id", ((userData.Farmer_Id)));

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
                        Model.Users user = new Model.Users();
                        user.User_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (user.User_Id == -101)
                        {
                            result.message = "User Already Exist";
                        }
                        else if (user.User_Id == -102)
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

        public object UpdateUser(Model.Users userData)
        {
            Result result = new Result();
            string query = string.Format("InUpDeUserProfile");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "Up");
                cmd.Parameters.AddWithValue("@id", userData.User_Id);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@User_First_Name", ((userData.User_First_Name)).Trim());
                cmd.Parameters.AddWithValue("@User_Last_Name", ((userData.User_Last_Name)).Trim());
                cmd.Parameters.AddWithValue("@User_Email_Id", ((userData.User_Email_Id)).Trim());
                cmd.Parameters.AddWithValue("@Password", ((userData.Password)).Trim());
                cmd.Parameters.AddWithValue("@User_Image", ((userData.User_Image)).Trim());
                cmd.Parameters.AddWithValue("@User_Phone", ((userData.User_Phone)).Trim());
                cmd.Parameters.AddWithValue("@UserType_Id", ((userData.UserType_Id)));
                cmd.Parameters.AddWithValue("@Farmer_Id", ((userData.Farmer_Id)));

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
                        Model.Users user = new Model.Users();
                        user.User_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (user.User_Id == -101)
                        {
                            result.message = "User Already Exist";
                        }
                        else if (user.User_Id == -102)
                        {
                            result.message = "InActive User";
                        }
                        else if (user.User_Id == -103)
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
