using Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Globalization;
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
                        phase.Posts= (reader.GetValue(6) != null) ? int.Parse(reader.GetInt32(6).ToString()) : 0;

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
                cmd.Parameters.AddWithValue("@Posts", (layoutData.Posts));

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
                            layoutData.Farm_Layout_Id = layout.Farm_Layout_Id;
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
            if (result.message.Contains("Data Saved"))
            {
                CreatePhases(layoutData);
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
                cmd.Parameters.AddWithValue("@Posts", (layoutData.Posts));

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
        public object GetLayoutData(int farmLayoutId)
        {
            try
            {

                Result result = new Result();
                string query = string.Format("GetPhase " + farmLayoutId);
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
                            phase.PhaseId = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                            phase.PhaseNo = (reader.GetValue(1) != null) ? int.Parse(reader.GetInt32(1).ToString()) : 0;
                            phase.Farm_Id = (reader.GetValue(2) != null) ? int.Parse(reader.GetInt32(2).ToString()) : 0;
                            phase.Farmer_Id = (reader.GetValue(3) != null) ? int.Parse(reader.GetInt32(3).ToString()) : 0;
                            phase.Layout_Id = (reader.GetValue(4) != null) ? int.Parse(reader.GetInt32(4).ToString()) : 0;

                            string qGetHouse = string.Format("GetHouse " + phase.PhaseId);
                            using (SqlConnection conToHouse = new SqlConnection(Connections.Connect()))
                            {
                                using (SqlCommand cmdqGetHouse = new SqlCommand(qGetHouse, conToHouse))
                                {
                                    conToHouse.Open();
                                    SqlDataReader houseReader = cmdqGetHouse.ExecuteReader();
                                    if (houseReader.HasRows)
                                    {
                                        while (houseReader.Read())
                                        {
                                            House house = new House();
                                            house.HouseId = (houseReader.GetValue(0) != null) ? int.Parse(houseReader.GetInt32(0).ToString()) : 0;
                                            house.HouseNo = (houseReader.GetValue(1) != null) ? int.Parse(houseReader.GetInt32(1).ToString()) : 0;
                                            house.CropId = (houseReader.GetValue(2) != null) ? int.Parse(houseReader.GetInt32(2).ToString()) : 0;
                                            house.PhaseId = (houseReader.GetValue(3) != null) ? int.Parse(houseReader.GetInt32(3).ToString()) : 0;

                                            string qGetRow = string.Format("GetRow " + house.HouseId);
                                            using (SqlConnection conToRow = new SqlConnection(Connections.Connect()))
                                            {
                                                using (SqlCommand cmdqGetRow = new SqlCommand(qGetRow, conToRow))
                                                {
                                                    conToRow.Open();
                                                    SqlDataReader rowReader = cmdqGetRow.ExecuteReader();
                                                    if (rowReader.HasRows)
                                                    {
                                                        while (rowReader.Read())
                                                        {
                                                            Row row = new Row();
                                                            row.RowId = (rowReader.GetValue(0) != null) ? int.Parse(rowReader.GetInt32(0).ToString()) : 0;
                                                            row.RowNo = (rowReader.GetValue(1) != null) ? int.Parse(rowReader.GetInt32(1).ToString()) : 0;
                                                            row.CropId = (rowReader.GetValue(2) != null) ? int.Parse(rowReader.GetInt32(2).ToString()) : 0;
                                                            row.HouseId = (rowReader.GetValue(3) != null) ? int.Parse(rowReader.GetInt32(3).ToString()) : 0;

                                                            string qGetPost = string.Format("GetPost " + row.RowId);
                                                            using (SqlConnection conToPost = new SqlConnection(Connections.Connect()))
                                                            {
                                                                using (SqlCommand cmdqGetPost = new SqlCommand(qGetPost, conToPost))
                                                                {
                                                                    conToPost.Open();
                                                                    SqlDataReader postReader = cmdqGetPost.ExecuteReader();
                                                                    if (postReader.HasRows)
                                                                    {
                                                                        while (postReader.Read())
                                                                        {
                                                                            Post post = new Post();
                                                                            post.PostId = (postReader.GetValue(0) != null) ? int.Parse(postReader.GetInt32(0).ToString()) : 0;
                                                                            post.PostNo = (postReader.GetValue(1) != null) ? int.Parse(postReader.GetInt32(1).ToString()) : 0;
                                                                            post.PestId = (postReader.GetValue(2) != null) ? int.Parse(postReader.GetInt32(2).ToString()) : 0;
                                                                            post.BenificialsId = (postReader.GetValue(3) != null) ? Convert.ToString(postReader.GetString(3)) : "";
                                                                            post.Intensity = (postReader.GetValue(4) != null) ? int.Parse(postReader.GetInt32(4).ToString()) : 0;
                                                                            post.Comment = (postReader.GetValue(5) != null) ? Convert.ToString(postReader.GetString(5)) : "";
                                                                            post.RowId = (postReader.GetValue(6) != null) ? int.Parse(postReader.GetInt32(6).ToString()) : 0;
                                                                            post.Week = (postReader.GetValue(7) != null) ? int.Parse(postReader.GetInt32(7).ToString()) : 0;
                                                                            post.CreatedDate = (postReader.GetValue(8) != null) ? Convert.ToDateTime(postReader.GetDateTime(8)) : DateTime.Now;
                                                                            row.PostData.Add(post);
                                                                        }
                                                                    }
                                                                    conToPost.Close();
                                                                }
                                                            }
                                                            house.RowData.Add(row);
                                                        }
                                                    }
                                                    conToRow.Close();
                                                }
                                            }

                                            phase.HouseData.Add(house);
                                        }
                                    }
                                    conToHouse.Close();
                                }
                            }

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
            catch (Exception e)
            {
                return null;
            }
        }
        #endregion

        #region Row
        public void CreateRow(Model.FarmLayout layoutData, Model.House houseData)
        {
            Model.Row rowData = new Model.Row();
            rowData.CropId = 0;
            rowData.HouseId = houseData.HouseId;
            for (int i = 0; i < layoutData.Rows; i++)
            {
                rowData.RowNo = i + 1;
                SaveRow(layoutData,rowData);
            }
        }
        public object SaveRow(Model.FarmLayout layoutData, Model.Row rowData)
        {
            Result result = new Result();
            string query = string.Format("InUpDeRow");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "In");
                cmd.Parameters.AddWithValue("@id", 0);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@Row_No", rowData.RowNo);
                cmd.Parameters.AddWithValue("@Crop_Id", (rowData.CropId));
                cmd.Parameters.AddWithValue("@House_Id", (rowData.HouseId));

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.Row row = new Model.Row();
                        row.RowId = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (row.RowId == -101)
                        {
                            result.message = "Row Already Exist";
                        }
                        else if (row.RowId == -102)
                        {
                            result.message = "InActive Row";
                        }
                        else
                        {
                            rowData.RowId = row.RowId;
                            result.message = "Data Saved";
                            result.data.Add(row);
                        }
                    }
                }
                else
                {
                    result.message = "Unable to process request";
                }
                con.Close();
            }
            if (result.message.Contains("Data Saved"))
            {
                CreatePost(layoutData, rowData);
            }

            result.status = 1;
            result.count = result.data.Count;
            result.data_name = "Row";
            return result;
        }
        public object UpdateRowCrop(Model.Row rowData)
        {
            Result result = new Result();
            string query = string.Format("InUpDeRow");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "UpCrop");
                cmd.Parameters.AddWithValue("@id", rowData.RowId);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@Row_No", rowData.RowNo);
                cmd.Parameters.AddWithValue("@Crop_Id", (rowData.CropId));
                cmd.Parameters.AddWithValue("@House_Id", (rowData.HouseId));

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.Row row = new Model.Row();
                        row.RowId = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (row.RowId == -101)
                        {
                            result.message = "Row Already Exist";
                        }
                        else if (row.RowId == -102)
                        {
                            result.message = "InActive Row";
                        }
                        else if (row.RowId == -103)
                        {
                            result.message = "Not Exist";
                        }
                        else
                        {
                            rowData.RowId = row.RowId;
                            result.message = "Data Saved";
                            result.data.Add(row);
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
            result.data_name = "Row";
            return result;
        }
        #endregion

        #region Post
        public void CreatePost(Model.FarmLayout layoutData, Model.Row rowData)
        {
            Model.Post postData = new Model.Post();
            postData.BenificialsId = "";
            postData.Intensity = 0;
            postData.Comment = "";
            postData.Week = GetIso8601WeekOfYear(DateTime.Now);
            postData.CreatedDate = DateTime.Now;
            postData.RowId = rowData.RowId;
            for (int i = 0; i < layoutData.Posts; i++)
            {
                postData.PostNo = i + 1;
                SavePost(layoutData, postData);
            }
        }
        public object SavePost(Model.FarmLayout layoutData, Model.Post postData)
        {
            Result result = new Result();
            string query = string.Format("InUpDePost");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "In");
                cmd.Parameters.AddWithValue("@id", 0);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@Post_No", postData.PostNo);
                cmd.Parameters.AddWithValue("@Pest_Id", (postData.PestId));
                cmd.Parameters.AddWithValue("@Benificials_Ids", (postData.BenificialsId));
                cmd.Parameters.AddWithValue("@Intensity", (postData.Intensity));
                cmd.Parameters.AddWithValue("@Comment", (postData.Comment));
                cmd.Parameters.AddWithValue("@Row_Id", (postData.RowId));
                cmd.Parameters.AddWithValue("@Week", (postData.Week));
                cmd.Parameters.AddWithValue("@CreatedDate", (postData.CreatedDate));

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.Post post = new Model.Post();
                        post.PostId = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (post.PostId == -101)
                        {
                            result.message = "Post Already Exist";
                        }
                        else if (post.PostId == -102)
                        {
                            result.message = "InActive Post";
                        }
                        else
                        {
                            result.message = "Data Saved";
                            result.data.Add(post);
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
            result.data_name = "Post";
            return result;
        }
        public static int GetIso8601WeekOfYear(DateTime time)
        {
            // Seriously cheat.  If its Monday, Tuesday or Wednesday, then it'll 
            // be the same week# as whatever Thursday, Friday or Saturday are,
            // and we always get those right
            DayOfWeek day = CultureInfo.InvariantCulture.Calendar.GetDayOfWeek(time);
            if (day >= DayOfWeek.Monday && day <= DayOfWeek.Wednesday)
            {
                time = time.AddDays(3);
            }

            // Return the week of our adjusted day
            return CultureInfo.InvariantCulture.Calendar.GetWeekOfYear(time, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);
        }
        public object UpdatePostData(Model.Post postData)
        {
            Result result = new Result();
            string query = string.Format("InUpDePost");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "Up");
                cmd.Parameters.AddWithValue("@id", postData.PostId);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@Post_No", postData.PostNo);
                cmd.Parameters.AddWithValue("@Pest_Id", (postData.PestId));
                cmd.Parameters.AddWithValue("@Benificials_Ids", (postData.BenificialsId));
                cmd.Parameters.AddWithValue("@Intensity", (postData.Intensity));
                cmd.Parameters.AddWithValue("@Comment", (postData.Comment));
                cmd.Parameters.AddWithValue("@Row_Id", (postData.RowId));
                cmd.Parameters.AddWithValue("@Week", (postData.Week));
                cmd.Parameters.AddWithValue("@CreatedDate", DateTime.Now);

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.Post post = new Model.Post();
                        post.PostId = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (post.PostId == -101)
                        {
                            result.message = "Post Already Exist";
                        }
                        else if (post.PostId == -102)
                        {
                            result.message = "InActive Post";
                        }
                        else
                        {
                            result.message = "Data Saved";
                            result.data.Add(post);
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
            result.data_name = "Post";
            return result;
        }
        #endregion

        #region Phase
        public void CreatePhases(Model.FarmLayout layoutData)
        {
            Model.Phase phaseData = new Model.Phase();
            phaseData.Farm_Id = layoutData.Farm_Id;
            phaseData.Farmer_Id = layoutData.Farm_Id;
            phaseData.Layout_Id = layoutData.Farm_Layout_Id;

            for (int i = 0; i < layoutData.Phases; i++)
            {
                phaseData.PhaseNo = i + 1;
                SavePhase(layoutData, phaseData);
            }
        }
        public object SavePhase(Model.FarmLayout layoutData, Model.Phase phaseData)
        {
            Result result = new Result();
            string query = string.Format("InUpDePhase");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "In");
                cmd.Parameters.AddWithValue("@id", 0);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@Phase_No", phaseData.PhaseNo);
                cmd.Parameters.AddWithValue("@Farm_Id", (phaseData.Farm_Id));
                cmd.Parameters.AddWithValue("@Farmer_Id", (phaseData.Farmer_Id));
                cmd.Parameters.AddWithValue("@Layout_Id", (phaseData.Layout_Id));

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.Phase phase = new Model.Phase();
                        phase.PhaseId = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (phase.PhaseId == -101)
                        {
                            result.message = "Phase Already Exist";
                        }
                        else if (phase.PhaseId == -102)
                        {
                            result.message = "InActive Phase";
                        }
                        else
                        {
                            phaseData.PhaseId = phase.PhaseId;
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
            if (result.message.Contains("Data Saved"))
            {
                CreateHouses(layoutData, phaseData);
            }

            result.status = 1;
            result.count = result.data.Count;
            result.data_name = "Phase";
            return result;
        }
        #endregion

        #region House
        public void CreateHouses(Model.FarmLayout layoutData, Model.Phase phaseData)
        {
            Model.House houseData = new Model.House();
            houseData.CropId = 0;
            houseData.PhaseId = phaseData.PhaseId;
            for (int i = 0; i < layoutData.House; i++)
            {
                houseData.HouseNo = i + 1;
                SaveHouse(layoutData, houseData);
            }
        }
        public object SaveHouse(Model.FarmLayout layoutData, Model.House houseData)
        {
            Result result = new Result();
            string query = string.Format("InUpDeHouse");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "In");
                cmd.Parameters.AddWithValue("@id", 0);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@House_No", houseData.HouseNo);
                cmd.Parameters.AddWithValue("@Crop_Id", (houseData.CropId));
                cmd.Parameters.AddWithValue("@Phase_Id", (houseData.PhaseId));

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.House house = new Model.House();
                        house.HouseId = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (house.HouseId == -101)
                        {
                            result.message = "House Already Exist";
                        }
                        else if (house.HouseId == -102)
                        {
                            result.message = "InActive House";
                        }
                        else
                        {
                            houseData.HouseId = house.HouseId;
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
            if (result.message.Contains("Data Saved"))
            {
                CreateRow(layoutData, houseData);
            }

            result.status = 1;
            result.count = result.data.Count;
            result.data_name = "House";
            return result;
        }
        public object UpdateHouseCrop(Model.House houseData)
        {
            Result result = new Result();
            string query = string.Format("InUpDeHouse");
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@StatementType", "Up");
                cmd.Parameters.AddWithValue("@id", houseData.HouseId);
                cmd.Parameters.AddWithValue("@Columns", "");
                cmd.Parameters.AddWithValue("@House_No", houseData.HouseNo);
                cmd.Parameters.AddWithValue("@Crop_Id", (houseData.CropId));
                cmd.Parameters.AddWithValue("@Phase_Id", (houseData.PhaseId));

                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        Model.House house = new Model.House();
                        house.HouseId = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        if (house.HouseId == -101)
                        {
                            result.message = "House Already Exist";
                        }
                        else if (house.HouseId == -102)
                        {
                            result.message = "InActive House";
                        }
                        else
                        {
                            houseData.HouseId = house.HouseId;
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
