import Dialogue from "./Dialogue";
function Tutorial(props) {
    return <Dialogue onFinish={props.onClick} lines={[
        {
            text: '\'Twas the night before October 7th, and in Lab 8 not a creature was stirring. Or was it?',
            img: 'assets/tutorial_room_low_res.png',
        },
        {
            text: 'What could that be? It seems to have crept out of its container...',
            img: 'assets/goober.png',
        },
        {
            text: 'Some tiny and helpless creature, no doubt. The poor thing, trapped in this lab, with only a small box and a few others of its kind for enrichment. You can tell that they yearn for the outdoors...',
            img: 'assets/goober.png',
        },
        {
            text: 'In this game you\'ll lead the goobers to freedom from their laboratory. You\'ll control the population of goobers, sending them on expeditions in this unknown environment to gather food and explore new locations. But be careful! Danger lurks around every corner.'
        },
        {
            text: 'They won\'t be able to make it on their own, but they can reproduce to get more help...',
            img: 'assets/reproduce_tutorial.png',
        },
        {
            text: '...But larger populations require more food. If you can\'t feed every goober each day, you lose!',
        },
        {
            text: 'Goobers can combine to produce new types of offspring. Experiment with pairing different combinations.',
            img: 'assets/combination_tutorial.png',
        },
        {
            text: 'Gather food, reproduce, and explore to escape the lab and win!'
        }

    ]} />
}

export default Tutorial;
