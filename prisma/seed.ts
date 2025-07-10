import { PrismaClient, Status } from "@/lib/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash("password", 10);

  const admin = await prisma.user.create({
    data: {
      email: "admin@oneclick.com",
      password: hashedPassword,
      name: "Admin User",
    },
  });

  console.log("Admin user created:", admin);
  // Create sample listings
  const listings = [
    {
      title: "Toyota Camry 2020",
      description: "Reliable sedan perfect for business trips",
      price: 45.99,
      location: "New York, NY",
      make: "Toyota",
      model: "Camry",
      year: 2020,
      imageUrl: "https://example.com/camry.jpg",
      status: Status.PENDING,
    },
    {
      title: "BMW X5 2021",
      description: "Luxury SUV with premium features",
      price: 89.99,
      location: "Los Angeles, CA",
      make: "BMW",
      model: "X5",
      year: 2021,
      imageUrl: "https://example.com/bmw-x5.jpg",
      status: Status.PENDING,
    },
    {
      title: "Honda Civic 2019",
      description: "Compact car with excellent fuel economy",
      price: 35.99,
      location: "Chicago, IL",
      make: "Honda",
      model: "Civic",
      year: 2019,
      imageUrl: "https://example.com/civic.jpg",
      status: Status.PENDING,
    },
    {
      title: "Ford Mustang 2022",
      description: "Fast and powerful sports car",
      price: 65.99,
      location: "San Francisco, CA",
      make: "Ford",
      model: "Mustang",
      year: 2022,
      imageUrl: "https://example.com/mustang.jpg",
      status: Status.PENDING,
    },
    {
      title: "Tesla Model S 2020",
      description: "Electric car with outstanding performance",
      price: 85.99,
      location: "Seattle, WA",
      make: "Tesla",
      model: "Model S",
      year: 2020,
      imageUrl: "https://example.com/model-s.jpg",
      status: Status.PENDING,
    },
    {
      title: "Volkswagen Golf 2018",
      description: "Compact car with reliable performance",
      price: 40.99,
      location: "Dallas, TX",
      make: "Volkswagen",
      model: "Golf",
      year: 2018,
      imageUrl: "https://example.com/golf.jpg",
      status: Status.PENDING,
    },
    {
      title: "Audi A4 2021",
      description: "Premium sedan with advanced features",
      price: 60.99,
      location: "Houston, TX",
      make: "Audi",
      model: "A4",
      year: 2021,
      imageUrl: "https://example.com/audi-a4.jpg",
      status: Status.PENDING,
    },
    {
      title: "Mercedes-Benz C-Class 2022",
      description: "Luxury sedan with advanced technology",
      price: 100.99,
      location: "Miami, FL",
      make: "Mercedes-Benz",
      model: "C-Class",
      year: 2022,
      imageUrl: "https://example.com/mercedes-c-class.jpg",
      status: Status.PENDING,
    },
    {
      title: "Lamborghini Huracan 2019",
      description: "Sports car with stunning performance",
      price: 150.99,
      location: "New York, NY",
      make: "Lamborghini",
      model: "Huracan",
      year: 2019,
      imageUrl: "https://example.com/lamborghini-huracan.jpg",
      status: Status.PENDING,
    },
    {
      title: "Ferrari 488 GTB 2022",
      description: "Sports car with exceptional performance",
      price: 180.99,
      location: "Los Angeles, CA",
      make: "Ferrari",
      model: "488 GTB",
      year: 2022,
      imageUrl: "https://example.com/ferrari-488-gtb.jpg",
      status: Status.PENDING,
    },
    {
      title: "Pagani Huayra 2018",
      description: "Luxury sports car with advanced technology",
      price: 200.99,
      location: "Chicago, IL",
      make: "Pagani",
      model: "Huayra",
      year: 2018,
      imageUrl: "https://example.com/pagani-huayra.jpg",
      status: Status.PENDING,
    },
    {
      title: "Bugatti Chiron 2023",
      description: "Sports car with stunning performance",
      price: 250.99,
      location: "San Francisco, CA",
      make: "Bugatti",
      model: "Chiron",
      year: 2023,
      imageUrl: "https://example.com/bugatti-chiron.jpg",
      status: Status.PENDING,
    },
    {
      title: "McLaren F1 2022",
      description: "Sports car with advanced technology",
      price: 300.99,
      location: "Seattle, WA",
      make: "McLaren",
      model: "F1",
      year: 2022,
      imageUrl: "https://example.com/mclaren-f1.jpg",
      status: Status.PENDING,
    },
  ];

  for (const listing of listings) {
    const car = await prisma.carDetails.create({ data: listing });
    await prisma.auditLog.create({
      data: {
        adminId: admin.id,
        details: `Car created with ID: ${car.id}`,
        action: "CREATE",
        carId: car.id,
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
