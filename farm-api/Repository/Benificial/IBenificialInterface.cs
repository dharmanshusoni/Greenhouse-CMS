using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Benificial
{
    public interface IBenificialInterface
    {
        Object SaveBenificial(Model.Benificials benificial);
        Object UpdateBenificial(Model.Benificials benificial);
        Object GetBenificialDetail(int benificialId);
        Object GetBenificialDetailByPestId(int pestId); 
    }
}
