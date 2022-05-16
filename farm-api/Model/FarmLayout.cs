using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class FarmLayout
    {
        public int Farm_Layout_Id { get; set; }
        public int House { get; set; }
        public int Zone { get; set; }
        public int Phases { get; set; }
        public int Rows { get; set; }
        public int Farm_Id { get; set; }
    }

    public class Phase
    {
        public int Phase_Id { get; set; }
        public string Phase_Name { get; set; }
        public int Farm_Id { get; set; }
        public int Farmer_Id { get; set; }
    }

    public class House
    {
        public int House_Id { get; set; }
        public string House_Name { get; set; }
        public int Phase_Id { get; set; }
    }
}
