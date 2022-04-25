using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class Plantation
    {
        public int Plantation_Id { get; set; }
        public DateTime Plantation_Date { get; set; }
        public DateTime Cleanout_Date { get; set; }
        public int No_Acerage { get; set; }
        public int Crop_Id { get; set; }
    }
}
