using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Decease
{
    public interface IDeceaseInterface
    {
        Object SaveDecease(Model.Decease decease);
        Object UpdateDecease(Model.Decease decease);
        Object GetDeceaseDetail(int deceaseId);
    }
}
