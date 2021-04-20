using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RestaurantAPI.Models
{
    public class Nourriture
    {
        [Key]
        public int NourritureId { get; set; }

        [Column(TypeName ="nvarchar(100)")]
        public string NourritureNom { get; set; }

        public decimal Prix { get; set; }
    }
}
