import { Cascader } from 'antd';
import cities from '../utils/cities'
const options = cities;

const CityChoose = ({province,city}) =>{
    return(
        <Cascader
        options={options}
        placeholder="请选择"
        style={{width:`200px`}}
        defaultValue={province?[province,city]:null}
    />
    )
}
export default CityChoose;