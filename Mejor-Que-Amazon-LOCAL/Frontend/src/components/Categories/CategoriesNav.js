import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Categories.css'
import { BsHouseDoorFill, BsFillHouseFill, BsFillPuzzleFill } from 'react-icons/bs'
import { AiFillCar } from 'react-icons/ai';
import { GiFlowerPot, GiClothes } from 'react-icons/gi';
import { TiSortAlphabetically } from 'react-icons/ti';
import { MdPhoneAndroid } from 'react-icons/md'

function CategoriesNav() {
    return (
        <div className="container" id="categories">
            <h1>Categorías</h1>
            <Link to="/categories/all">
                <Button variant="dark" id="all"><TiSortAlphabetically />Todo</Button>{' '}
            </Link>
            <Link to="/categories/properties">
                <Button variant="dark" id="properties"><BsHouseDoorFill />Propiedades</Button>{' '}
            </Link>
            <Link to="/categories/auto">
                <Button variant="dark" id="auto"><AiFillCar />Vehículos</Button>{' '}
            </Link>
            <Link to="/categories/home">
                <Button variant="dark" id="home"><BsFillHouseFill />Hogar</Button>{' '}
            </Link>
            <Link to="/categories/electronics">
                <Button variant="dark" id="electronics"><MdPhoneAndroid />Electrónicos</Button>{' '}
            </Link>
            <Link to="/categories/clothes">
                <Button variant="dark" id="clothes"><GiClothes />Ropa</Button>{' '}
            </Link>
            <Link to="/categories/toys">
                <Button variant="dark" id="toys"><BsFillPuzzleFill />Juguetes</Button>{' '}
            </Link>
            <Link to="/categories/garden">
                <Button variant="dark" id="garden"><GiFlowerPot />Jardinería</Button>{' '}
            </Link>
        </div>
    )
}

export default CategoriesNav;