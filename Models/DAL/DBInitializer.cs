using System.Collections.Generic;
using System.Data.Entity;

namespace FullStackDemo.Models.DAL
{
    public class DBInitializer : CreateDatabaseIfNotExists<PeopleContext>
    {
        protected override void Seed(PeopleContext context)
        {
            List<Person> defaultData = new List<Person>();
            defaultData.Add(new Person()
            {
                FirstName = "George",
                LastName = "Washington",
                Age = 67,
                Address = "Popes Creek, Colony of Virginia, British America",
                Interests = "Farming, fathering a country",
                PortraitURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg/220px-Gilbert_Stuart_Williamstown_Portrait_of_George_Washington.jpg"
            });
            defaultData.Add(new Person()
            {
                FirstName = "John",
                LastName = "Adams",
                Age = 90,
                Address = "Braintree, Massachusetts Bay, British America",
                Interests = "Writing to Abigail",
                PortraitURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/John_Adams%2C_Gilbert_Stuart%2C_c1800_1815.jpg/220px-John_Adams%2C_Gilbert_Stuart%2C_c1800_1815.jpg"
            });
            defaultData.Add(new Person()
            {
                FirstName = "Thomas",
                LastName = "Jeffferson",
                Age = 83,
                Address = "Shadwell, Colony of Virginia, British America",
                Interests = "Farming, architecture",
                PortraitURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Official_Presidential_portrait_of_Thomas_Jefferson_%28by_Rembrandt_Peale%2C_1800%29%28cropped%29.jpg/220px-Official_Presidential_portrait_of_Thomas_Jefferson_%28by_Rembrandt_Peale%2C_1800%29%28cropped%29.jpg"
            });
            defaultData.Add(new Person()
            {
                FirstName = "James",
                LastName = "Madison",
                Age = 85,
                Address = "Port Conway, Colony of Virginia, British America",
                Interests = "Politics, civil liberties",
                PortraitURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/James_Madison%28cropped%29%28c%29.jpg/220px-James_Madison%28cropped%29%28c%29.jpg"
            });
            defaultData.Add(new Person()
            {
                FirstName = "James",
                LastName = "Monroe",
                Age = 73,
                Address = "Monroe Hall, Virginia, British America",
                Interests = "Foreign affairs, land acquisition",
                PortraitURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/James_Monroe_White_House_portrait_1819.jpg/220px-James_Monroe_White_House_portrait_1819.jpg"
            });
            defaultData.Add(new Person()
            {
                FirstName = "John Quincy",
                LastName = "Adams",
                Age = 80,
                Address = "Braintree, Massachusetts Bay, British America",
                Interests = "Diplomacy, politics",
                PortraitURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/JQA_Photo.tif/lossy-page1-220px-JQA_Photo.tif.jpg"
            });
            defaultData.Add(new Person()
            {
                FirstName = "Andrew",
                LastName = "Jackson",
                Age = 78,
                Address = "Waxhaw Settlement, British America",
                Interests = "Military affairs",
                PortraitURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Andrew_jackson_headFXD.jpg/220px-Andrew_jackson_headFXD.jpg"
            });
            defaultData.Add(new Person()
            {
                FirstName = "Martin",
                LastName = "Van Buren",
                Age = 79,
                Address = "Kinderhook, New York, U.S.",
                Interests = "Two party system creation",
                PortraitURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Martin_Van_Buren_by_Mathew_Brady_c1855-58.jpg/220px-Martin_Van_Buren_by_Mathew_Brady_c1855-58.jpg"
            });
            defaultData.Add(new Person()
            {
                FirstName = "William Henry",
                LastName = "Harrison",
                Age = 68,
                Address = "Charles City County, Colony of Virginia, British America",
                Interests = "Presidential Longevity",
                PortraitURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/William_Henry_Harrison_daguerreotype_edit.jpg/220px-William_Henry_Harrison_daguerreotype_edit.jpg"
            });
            defaultData.Add(new Person()
            {
                FirstName = "John",
                LastName = "Tyler",
                Age = 71,
                Address = "Charles City County, Virginia, U.S.",
                Interests = "Law, State's Rights",
                PortraitURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Tyler_Daguerreotype_%28restoration%29.jpg/220px-Tyler_Daguerreotype_%28restoration%29.jpg"
            });
            defaultData.Add(new Person()
            {
                FirstName = "James K.",
                LastName = "Polk",
                Age = 53,
                Address = "Pineville, North Carolina, U.S.",
                Interests = "Territory annexation",
                PortraitURL = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/James_Polk_restored.jpg/220px-James_Polk_restored.jpg"
            });

            context.People.AddRange(defaultData);

            base.Seed(context);
        }
    }
}