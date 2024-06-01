import ImgProject1 from '../../assets/img/Img-Project1.png'
import ImgProject2 from '../../assets/img/Img-Project2.png'

import IconTwitter from '../../assets/svg/projectsComponents/IconTwitter.svg'
import IconGithub from '../../assets/svg/projectsComponents/IconGithub.svg'
import IconWebsite from '../../assets/svg/projectsComponents/IconWebsite.svg'

interface itemsValue {
  id: number,
  img: any,
  name: string,
  slogan: string,
  description: string,
  tags: string[],
  socials: string[],
  addressWallet: string,
  deposit: string
}

const Projects: itemsValue[] = [
  {
    id: 1,
    img: ImgProject1,
    name: 'QuantumNet',
    slogan: 'Connecting the future with quantum computing',
    description: 'QuantumNet is a pioneering project aimed at developing the first accessible quantum communications network for researchers around the world. Our mission is to facilitate global scientific collaboration and accelerate discoveries in physics, chemistry, and biology through the use of secure and fast quantum technologies. With QuantumNet, researchers will be able to share encrypted quantum data, perform collaborative computations, and remotely access quantum computing resources, promoting a new era of transparency and efficiency in scientific research.',
    tags: ['QuantumComputing', 'SecureNetwork', 'Innovation', 'ScientificCollaboration', 'QuantumCommunications'],
    socials: [IconTwitter, IconGithub, IconWebsite],
    addressWallet: '0xdDFA90628673895257b385A68602Baccc0fc51a8',
    deposit: '1640.00 DAI'
  },{
    id: 2,
    img: ImgProject2,
    name: 'EcoNet Dynamics',
    slogan: 'Unraveling nature of networks',
    description: 'EcoNet Dynamics is an innovative ecological research project focused on analyzing and modeling the complex interdependencies within ecosystems. By leveraging cutting-edge data analytics and machine learning techniques, our team aims to gain insights into the ecological networks that sustain biodiversity. We explore interactions ranging from pollination networks and food webs to habitat connectivity and gene flow. Our findings aim to inform conservation strategies, predict the impacts of climate change, and guide sustainable resource management. EcoNet Dynamics stands as a beacon for ecological understanding and stewardship, fostering a harmonious relationship between humanity and the environment.',
    tags: ['Ecology', 'Biodiversity', 'Conservation', 'SustainableLiving', 'ClimateChange'],
    socials: [IconTwitter, IconGithub, IconWebsite],
    addressWallet: '0xfEEEeC412DCfc791aE9F06f7e23D62315c77C332',
    deposit: '1159.60 DAI'
  }
]

export default Projects