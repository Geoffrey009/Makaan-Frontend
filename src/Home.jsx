import { Header } from "./header/Header";
import { Hero } from "./hero/Hero";
import { PropertyOne } from "./propertyTypes/Property";
import { PropertyTwo } from "./propertyListing/propertyListing";
import { Agent } from "./agent/Agent";
import { Client } from "./client/Client";
import { Footer } from "./footer/Footer";

export const Home = () => {
    return (
        <>
        <Header />
        <Hero />
        <PropertyOne />
        <PropertyTwo />
        <Agent />
        <Client />
        <Footer />
        </>
    )
}