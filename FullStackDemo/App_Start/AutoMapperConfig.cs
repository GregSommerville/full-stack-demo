using AutoMapper;
using FullStackDemo.Models.DAL;
using FullStackDemo.Models.DTOs;

namespace FullStackDemo.App_Start
{
    public static class AutoMapperConfig
    {
        public static void DoMappings()
        {
            Mapper.Initialize(cfg => cfg.CreateMap<Person, PersonDTO>());
        }
    }
}