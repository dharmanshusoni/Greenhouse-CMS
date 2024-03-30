using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class Connections
    {
        public static string Connect()
        {
            return "Data Source=LAPTOP-7Q3NO3O1\\SQLEXPRESS;Initial Catalog=Farm;Trusted_Connection=True;";
            //return "Data Source=SQL8001.site4now.net;Initial Catalog=db_a85a28_scouts;User Id=db_a85a28_scouts_admin;Password=f***@**3;";
        }
    }
}
