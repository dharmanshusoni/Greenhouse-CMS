using Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.StickeyCard
{
    public class StickeyCardRepository : IStickeyCardInterface
    {
        SqlConnection con;
        public StickeyCardRepository()
        {
            con = new SqlConnection(Connections.Connect());
            SqlConnection.ClearAllPools();
        }

        public object GetStickeyCardDetail(int stickeyCardId)
        {
            Result result = new Result();
            string query = string.Format("GetStickeyCard " + stickeyCardId);
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    result.message = "Data Found";
                    while (reader.Read())
                    {
                        Model.StickeyCard stickeyCard = new Model.StickeyCard();
                        stickeyCard.StickeyCard_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        stickeyCard.Stickey_Card_color = (reader.GetValue(1) != null) ? reader.GetString(1) : string.Empty;
                        stickeyCard.Stickey_Card_Image = (reader.GetValue(2) != null) ? reader.GetString(2) : string.Empty;

                        result.data.Add(stickeyCard);
                    }
                }
                else
                {
                    result.message = "No Data Found";
                }
                con.Close();
            }
            result.data_name = "StickeyCard";
            result.status = 1;
            result.count = result.data.Count;
            return result;
        }

        public object SaveStickeyCard(Model.StickeyCard stickeyCardData)
        {
            Result result = new Result();
            string query = string.Format("InUpDeStickeyCard");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "In");
                cmd.Parameters.AddWithValue("@id", 0);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@Stickey_Card_color", stickeyCardData.Stickey_Card_color.Trim());
                cmd.Parameters.AddWithValue("@Stickey_Card_Image", stickeyCardData.Stickey_Card_Image.Trim());

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
                            result.message = "StickeyCard Already Exist";
                        }
                        else if (pest.Pest_Id == -102)
                        {
                            result.message = "InActive StickeyCard";
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
            result.data_name = "StickeyCard";
            return result;
        }

        public object UpdateStickeyCard(Model.StickeyCard stickeyCardData)
        {
            Result result = new Result();
            string query = string.Format("InUpDeStickeyCard");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "Up");
                cmd.Parameters.AddWithValue("@id", stickeyCardData.StickeyCard_Id);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@Stickey_Card_color", stickeyCardData.Stickey_Card_color.Trim());
                cmd.Parameters.AddWithValue("@Stickey_Card_Image", stickeyCardData.Stickey_Card_Image.Trim());

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
                            result.message = "StickeyCard Already Exist";
                        }
                        else if (pest.Pest_Id == -102)
                        {
                            result.message = "InActive StickeyCard";
                        }
                        else if (pest.Pest_Id == -103)
                        {
                            result.message = "StickeyCard Not Exist";
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
            result.data_name = "StickeyCard";
            return result;
        }
    }
}
