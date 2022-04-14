using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class Result
    {
        public int status { get; set; }
        public string message { get; set; }
        public int count { get; set; }
        public string data_name { get; set; }
        public string generated_on { get; set; }

        public ArrayList data = new ArrayList();

        public void addData(Object o)
        {
            data.Add(o);
        }

    }
}
