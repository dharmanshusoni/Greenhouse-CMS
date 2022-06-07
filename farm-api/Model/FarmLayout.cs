using System;
using System.Collections;
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
        public int Posts { get; set; }
        public int Farm_Id { get; set; }
    }

    public class Post
    {
        public int PostId { get; set; }
        public int PostNo { get; set; }
        public int PestId { get; set; }
        public string BenificialsId { get; set; }
        public int Intensity { get; set; }
        public string Comment { get; set; }
        public int Week { get; set; }
        public int RowId { get; set; }
        public DateTime CreatedDate { get; set; }
    }

    public class Row
    {
        public int RowId { get; set; }
        public int RowNo { get; set; }
        public int CropId { get; set; }
        public int HouseId { get; set; }

        public ArrayList PostData = new ArrayList();
        //public void addData(Object o)
        //{
        //    PostData.Add(o);
        //}
    }

    public class House
    {
        public int HouseId { get; set; }
        public int HouseNo { get; set; }
        public int CropId { get; set; }
        public int PhaseId { get; set; }
        public ArrayList RowData = new ArrayList();
        //public void addData(Object o)
        //{
        //    RowData.Add(o);
        //}
    }

    public class Phase
    {
        public int PhaseId { get; set; }
        public int PhaseNo { get; set; }
        public int Farm_Id { get; set; }
        public int Farmer_Id { get; set; }
        public int Layout_Id { get; set; }

        public ArrayList HouseData = new ArrayList();
        //public void addData(Object o)
        //{
        //    HouseData.Add(o);
        //}

    }


}
