import Card from '../components/cards/Card';
import tasks from '../utils/tasks';
import Select from 'react-select';
import ServCard from '../components/cards/ServCard';
import CustomButton from '../components/form-controls/CustomButton';

const customSelectStyles = {
  option: (provided, state) => ({
    ...provided
  }),
  control: (provided, state) => ({
    ...provided,
    boxShadow: state.isFocused ? '0 0 0 0.25rem rgb(69 168 216 / 25%)' : 'none',
    borderColor: state.isFocused ? '#a2d4ec' : '#ced4da',

    '&:hover': {
      borderColor: undefined
    }
  })
};

let servicios = [
  {
    grupo: 'Mantenimiento del hogar',
    skill: 'Plomería'
  },
  {
    grupo: 'Mascotas',
    skill: 'Pasear perros'
  }
];

const Servicios = () => {
  return (
    <div className="container custom-container">
      <div style={{ maxWidth: 600 }} className="mx-auto">
        <h2 className="mb-4">Servicios</h2>
        <Card>
          <div>
            <h5>Registra habilidades</h5>
            <Select
              styles={customSelectStyles}
              options={tasks}
              isMulti
              placeholder="Añadir habilidades"
            />
          </div>
          <CustomButton
            className="btn btn-primary text-white w-100 mt-4"
            type="submit"
          >
            Guardar
          </CustomButton>
        </Card>
        {servicios.map((servicio, idx) => {
          return <ServCard key={idx} {...servicio} />;
        })}
      </div>
    </div>
  );
};

export default Servicios;
