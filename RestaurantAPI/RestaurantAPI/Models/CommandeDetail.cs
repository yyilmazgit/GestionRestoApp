using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantAPI.Models
{
    public class CommandeDetail
    {
        [Key]
        public long CommandeDetailId { get; set; }

        public long CommandeMId { get; set; }

        public int NourritureId { get; set; }
        public Nourriture Nourriture { get; set; }

        public decimal NourriturePrix { get; set; }

        public int Quantite { get; set; }

    }
}
