using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class Application
    {
        public int Application_Id { get; set; }
        public int Application_type { get; set; }
        public string Application_Name { get; set; }
        public DateTime Application_Date { get; set; }
        public DateTime Application_Time { get; set; }
        public int Appilication_who_Assigned { get; set; }
        public int Application_Assigned_To { get; set; }
        public int Decease_Id { get; set; }
    }

    public class ApplicationType
    {
        public int ApplicationTypeId { get; set; }
        public string ApplicationTypes { get; set; }
        public string Icon { get; set; }
    }
}
