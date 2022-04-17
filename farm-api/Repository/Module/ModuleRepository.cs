using Model;
using Repository.Module;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.User
{
    public class ModuleRepository : IModuleInterface
    {
        SqlConnection con;
        public ModuleRepository()
        {
            // Local
            // con = new SqlConnection("Data Source=LAPTOP-7Q3NO3O1\\SQLEXPRESS;Initial Catalog=Farm;Trusted_Connection=True;");

            // Live
            con = new SqlConnection("Data Source=SQL8001.site4now.net;Initial Catalog=db_a85a28_scouts;User Id=db_a85a28_scouts_admin;Password=scouts@123;");
            SqlConnection.ClearAllPools();
        }

        public object GetModules(int userId)
        {
            //List<Result> Result = new List<Result>();
            Result result = new Result();
            string query = string.Format("GetModules "+userId+","+ userId);
            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                con.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                if (reader.HasRows)
                {
                    result.message = "Data Found";
                    while (reader.Read())
                    {
                        Model.Module module = new Model.Module();
                        module.ModuleId = (reader.GetValue(0) != null) ? int.Parse(reader.GetInt32(0).ToString()) : 0;
                        module.title = (reader.GetValue(1) != null) ? reader.GetString(1) : string.Empty;
                        module.path = (reader.GetValue(2) != null) ? reader.GetString(2) : string.Empty;
                        module.icon = (reader.GetValue(3) != null) ? reader.GetString(3) : string.Empty;
                        module.cclass = (!reader.IsDBNull(4)) ? reader.GetString(4) : string.Empty;
                        result.data.Add(module);
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
            result.data_name = "Modules";
            //result.generated_on = Base.getInstance().GetEpochOf(DateTimeOffset.Now.UtcDateTime);
            return result;
        }
    }
}
