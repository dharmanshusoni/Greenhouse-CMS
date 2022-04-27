using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class Decease
    {
      public int Decease_Id { get; set; }
      public string Decease_Name { get; set; }
      public int Crop_Id { get; set; }
      public bool Stickey_Card_Updated { get; set; }
    }
}
