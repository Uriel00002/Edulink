import React from 'react';
import HeaderSchedule from '../../components/tempo/create/HeaderSchedule'; 
import TableSchedule from '../../components/tempo/create/TableSchedule';
import Dropdown from '../../components/tempo/create/DropDown';
import '../../assets/css/create_schedule.css';

export const CreateScreen = () => {
  const dropdownOptions1 = [
    { label: 'Opción 1', value: 'option1' },
    { label: 'Opción 2', value: 'option2' },
    { label: 'Opción 3', value: 'option3' },
  ];

  const dropdownOptions2 = [
    { label: 'Opción A', value: 'optionA' },
    { label: 'Opción B', value: 'optionB' },
    { label: 'Opción C', value: 'optionC' },
  ];

  return (
    <React.Fragment>
      <HeaderSchedule className='create-header' />
      <section className='row px-3'>
        <div className="col col-4 row">
          <div className="schedule-items-subject col col-4">
            <div className="schedule-item-header">
              Materias
            </div>
            <div className="schedule-item"></div>
            <div className="schedule-item"></div>
            <div className="schedule-item"></div>
            <div className="schedule-item"></div>
            <div className="schedule-item"></div>
            <div className="schedule-item"></div>
            <div className="schedule-item"></div>
            <div className="schedule-item"></div>
          </div>
          <div className="schedule-items-teacher col col-4">
            <div className="schedule-item-header">
              Profesores
            </div>
            <div className="schedule-item"></div>
            <div className="schedule-item"></div>
            <div className="schedule-item"></div>
            <div className="schedule-item"></div>
            <div className="schedule-item"></div>
            <div className="schedule-item"></div>
            <div className="schedule-item"></div>
            <div className="schedule-item"></div>
          </div>
          <div className="schedule-items-classroom col col-4">
            <div className="schedule-item-header">
              Aulas
            </div>
            <div className="schedule-item"></div>
            <div className="schedule-item"></div>
            <div className="schedule-item"></div>
            <div className="schedule-item"></div>
            <div className="schedule-item"></div>
            <div className="schedule-item"></div>
            <div className="schedule-item"></div>
            <div className="schedule-item"></div>
          </div>
        </div>
        <div className="create-tempo flex-column py-5 col col-8">
          <div className='dropdowns-container w-75'>
            <Dropdown label='Dropdown 1' options={dropdownOptions1} id='dropdown1' name='dropdown1' />
            <Dropdown label='Dropdown 2' options={dropdownOptions2} id='dropdown2' name='dropdown2' />
          </div>
          <TableSchedule/>
        </div>
      </section>
    </React.Fragment>
  );
}

export default CreateScreen;