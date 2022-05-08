using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.PestIntensity
{
    public interface IPestIntensityInterface
    {
        Object SavePestIntensity(Model.PestIntensity pestIntensity);
        Object UpdatePestIntensity(Model.PestIntensity pestIntensity);
        Object GetPestIntensityDetail(int PestIntensityId);
    }
}
