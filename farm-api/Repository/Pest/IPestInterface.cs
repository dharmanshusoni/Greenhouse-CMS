using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Pest
{
    public interface IPestInterface
    {
        Object SavePest(Model.Pest pest);
        Object UpdatePest(Model.Pest pest);
        Object GetPestDetail(int pestId);
    }
}
