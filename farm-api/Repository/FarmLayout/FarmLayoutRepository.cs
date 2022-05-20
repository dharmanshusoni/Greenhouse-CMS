using Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.FarmLayout
{
    public class FarmLayoutRepository : IFarmLayoutInterface
    {
        SqlConnection con;
        public FarmLayoutRepository()
        {
            con = new SqlConnection(Connections.Connect());
            SqlConnection.ClearAllPools();
        }

        #region Layout
        public object GetLayout(int farmLayoutId,int farmId)
        {
            Result result = new Result();
            string query = string.Format("GetFarmLayout " + farmLayoutId + ", " + farmId);
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    result.message = "Data Found";
                    while (reader.Read())
                    {
                        Model.FarmLayout phase = new Model.FarmLayout();
                        phase.Farm_Layout_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        phase.House = (reader.GetValue(1) != null) ? int.Parse(reader.GetInt32(1).ToString()) : 0;
                        phase.Zone = (reader.GetValue(2) != null) ? int.Parse(reader.GetInt32(2).ToString()) : 0;
                        phase.Phases = (reader.GetValue(3) != null) ? int.Parse(reader.GetInt32(3).ToString()) : 0;
                        phase.Rows = (reader.GetValue(4) != null) ? int.Parse(reader.GetInt32(4).ToString()) : 0;
                        phase.Farm_Id = (reader.GetValue(5) != null) ? int.Parse(reader.GetInt32(5).ToString()) : 0;
                        result.data.Add(phase);
                    }
                }
                else
                {
                    result.message = "No Data Found";
                }
                con.Close();
            }
            result.data_name = "Layout";
            result.status = 1;
            result.count = result.data.Count;
            return result;
        }

        public object SaveLayout(Model.FarmLayout layoutData)
        {
            Result result = new Result();
            string query = string.Format("InUpDeFarmLayout");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "In");
                cmd.Parameters.AddWithValue("@id", 0);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@House", layoutData.House);
                cmd.Parameters.AddWithValue("@Zone", (layoutData.Zone));
                cmd.Parameters.AddWithValue("@Phases", (layoutData.Phases));
                cmd.Parameters.AddWithValue("@Rows", (layoutData.Rows));
                cmd.Parameters.AddWithValue("@Farm_Id", (layoutData.Farm_Id));

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.FarmLayout layout = new Model.FarmLayout();
                        layout.Farm_Layout_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (layout.Farm_Layout_Id == -101)
                        {
                            result.message = "Layout Already Exist";
                        }
                        else if (layout.Farm_Layout_Id == -102)
                        {
                            result.message = "InActive Layout";
                        }
                        else
                        {
                            result.message = "Data Saved";
                            result.data.Add(layout);
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
            result.data_name = "Layout";
            return result;
        }

        public object UpdateLayout(Model.FarmLayout layoutData)
        {
            Result result = new Result();
            string query = string.Format("InUpDeFarmLayout");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "Up");
                cmd.Parameters.AddWithValue("@id", layoutData.Farm_Layout_Id);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@House", layoutData.House);
                cmd.Parameters.AddWithValue("@Zone", (layoutData.Zone));
                cmd.Parameters.AddWithValue("@Phases", (layoutData.Phases));
                cmd.Parameters.AddWithValue("@Rows", (layoutData.Rows));
                cmd.Parameters.AddWithValue("@Farm_Id", (layoutData.Farm_Id));

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.FarmLayout farm = new Model.FarmLayout();
                        farm.Farm_Layout_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (farm.Farm_Layout_Id == -101)
                        {
                            result.message = "Layout Already Exist";
                        }
                        else if (farm.Farm_Layout_Id == -102)
                        {
                            result.message = "InActive Layout";
                        }
                        else if (farm.Farm_Layout_Id == -103)
                        {
                            result.message = "Layout Not Exist";
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
            result.data_name = "Layout";
            return result;
        }
        #endregion

        #region Phase
        public object GetPhase(int farmId)
        {
            Result result = new Result();
            string query = string.Format("GetPhase " + farmId);
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    result.message = "Data Found";
                    while (reader.Read())
                    {
                        Model.Phase phase = new Model.Phase();
                        phase.Phase_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        phase.Phase_Name = (reader.GetValue(1) != null) ? reader.GetString(1) : string.Empty;
                        phase.Farm_Id = (reader.GetValue(2) != null) ? int.Parse(reader.GetInt32(2).ToString()) : 0;
                        phase.Farmer_Id = (reader.GetValue(3) != null) ? int.Parse(reader.GetInt32(3).ToString()) : 0;

                        result.data.Add(phase);
                    }
                }
                else
                {
                    result.message = "No Data Found";
                }
                con.Close();
            }
            result.data_name = "Phase";
            result.status = 1;
            result.count = result.data.Count;
            return result;
        }

        public object SavePhase(Model.Phase phaseData)  
        {
            Result result = new Result();
            string query = string.Format("InUpDePhase");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "In");
                cmd.Parameters.AddWithValue("@id", 0);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@Phase_Name", ((phaseData.Phase_Name)).Trim());
                cmd.Parameters.AddWithValue("@Farm_Id", (phaseData.Farm_Id));
                cmd.Parameters.AddWithValue("@Farmer_Id", (phaseData.Farmer_Id));

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.Phase phase = new Model.Phase();
                        phase.Phase_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (phase.Phase_Id == -101)
                        {
                            result.message = "Phase Already Exist";
                        }
                        else if (phase.Phase_Id == -102)
                        {
                            result.message = "InActive Farm";
                        }
                        else
                        {
                            result.message = "Data Saved";
                            result.data.Add(phase);
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
            result.data_name = "Phase";
            return result;
        }
        #endregion

        #region House
        public object GetHouse(int phaseId)
        {
            Result result = new Result();
            string query = string.Format("GetHouse " + phaseId);
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    result.message = "Data Found";
                    while (reader.Read())
                    {
                        Model.House phase = new Model.House();
                        phase.House_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        phase.House_Name = (reader.GetValue(1) != null) ? reader.GetString(1) : string.Empty;
                        phase.Phase_Id = (reader.GetValue(2) != null) ? int.Parse(reader.GetInt32(2).ToString()) : 0;

                        result.data.Add(phase);
                    }
                }
                else
                {
                    result.message = "No Data Found";
                }
                con.Close();
            }
            result.data_name = "House";
            result.status = 1;
            result.count = result.data.Count;
            return result;
        }

        public object SaveHouse(Model.House houseData)
        {
            Result result = new Result();
            string query = string.Format("InUpDeHouse");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "In");
                cmd.Parameters.AddWithValue("@id", 0);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@House_Name", ((houseData.House_Name)).Trim());
                cmd.Parameters.AddWithValue("@Phase_Id", (houseData.Phase_Id));

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.House house = new Model.House();
                        house.House_Id = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (house.House_Id == -101)
                        {
                            result.message = "House Already Exist";
                        }
                        else if (house.House_Id == -102)
                        {
                            result.message = "InActive House";
                        }
                        else
                        {
                            result.message = "Data Saved";
                            result.data.Add(house);
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
            result.data_name = "House";
            return result;
        }
        #endregion

    }
}
