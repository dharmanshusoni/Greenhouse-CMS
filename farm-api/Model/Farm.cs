using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class Farm
    {
        public int Farm_Id { get; set; }
        public int Farmer_Id { get; set; }
        public string Farm_Name { get; set; }
        public string Farm_Address { get; set; }
        public string Farm_Address_2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
    }
}
