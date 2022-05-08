using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class PestIntensity
    {
        public int Crops_Id { get; set; }
        public int No_Acerage{ get; set; } 
        public int Intensity { get; set; }
        public int Farmer_Id { get; set; }
        public int Farm_Id   { get; set; }
        public int Pest_Id { get; set; }
        public int Crop_Id { get; set; }
    }
}
