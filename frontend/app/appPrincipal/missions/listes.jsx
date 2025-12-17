import MissionsListContent from "./_components/MissionsListContent/MissionsListContent";

const items = [
    {
        id: 1,
        title: "Barbecue",
        address: "96 Av. de La Liberté Tunis",
        distance: "5 km",
        author: "@Maitre",
        time: "2 min",
        image: "https://via.placeholder.com/120",
    },

    {
        id: 2,
        title: "Équipements maison",
        address: "96 Av. de La Liberté Tunis",
        distance: "13 km",
        author: "@Maitre",
        time: "2 min",
        image: require("../../../assets/equip.png"),
    },
];

export default function ListesPage() {
    return <MissionsListContent items={items} />;
}
