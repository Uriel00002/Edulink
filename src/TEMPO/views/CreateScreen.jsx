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
      <div className='dropdowns-container'>
        <Dropdown label='Dropdown 1' options={dropdownOptions1} id='dropdown1' name='dropdown1' />
        <Dropdown label='Dropdown 2' options={dropdownOptions2} id='dropdown2' name='dropdown2' />
      </div>
      <section className='create-tempo'>
        <TableSchedule/>
      </section>
    </React.Fragment>
  );
}

export default CreateScreen;