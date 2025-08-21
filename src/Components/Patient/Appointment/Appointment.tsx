/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { Tag } from 'primereact/tag';
import type { Nullable } from 'primereact/ts-helpers';
import { LoadingOverlay, Modal, Select, Textarea, TextInput } from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { getDoctorDropdown } from '../../../Service/DoctorProfileService';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { appointmentReasons } from '../../../Data/DropdownData';
import { useSelector } from 'react-redux';
import { scheduleAppointment } from '../../../Service/AppointmentService';
import { errorNotification, successNotification } from '../../../Utility/NotificationUtil';

type Customer = {
    id: number;
    name: string;
    country: { name: string; code: string };
    company: string;
    date: Date | string;
    status: string;
    verified: boolean;
    activity: number;
    representative: { name: string; image: string };
    balance: number;
};

const Appointment = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [opened, {open, close}] = useDisclosure(false);
    const[doctors, setDoctors]= useState<any[]>([]);
    const[loading, setLoading]= useState<boolean>(false);   
    const user=useSelector((state:any)=>state.user)
    const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        activity: { value: null, matchMode: FilterMatchMode.BETWEEN }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');
const [representatives] = useState([
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    { name: 'Anna Fali', image: 'annafali.png' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    { name: 'XuXue Feng', image: 'xuxuefeng.png' }
]);
    const [statuses] = useState(['unqualified', 'qualified', 'new', 'negotiation', 'renewal']);

    const getSeverity = (status: any) => {
        switch (status) {
            case 'unqualified':
                return 'danger';

            case 'qualified':
                return 'success';

            case 'new':
                return 'info';

            case 'negotiation':
                return 'warning';

            case 'renewal':
                return null;
        }
    };

    // [{label}]

useEffect(() => {
    const customerData = [{
        id: 1000,
        name: 'James Butt',
        country: {
            name: 'Algeria',
            code: 'dz'
        },
        company: 'Benton, John B Jr',
        date: '2015-09-13',
        status: 'unqualified',
        verified: true,
        activity: 17,
        representative: {
            name: 'Ioni Bowcher',
            image: 'ionibowcher.png'
        },
        balance: 70663
    }];
    getDoctorDropdown().then((data: any) => {
       console.log(data);
        setDoctors(data.map((doctor:any)=>  {
            "" +doctor.id;
            doctor.name
        }));
})
    setCustomers(getCustomers(customerData));
}, []); 

    const getCustomers = (data: any) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);

            return d;
        });
    };

    const formatDate = (value: { toLocaleDateString: (arg0: string, arg1: { day: string; month: string; year: string; }) => any; }) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatCurrency = (value: { toLocaleString: (arg0: string, arg1: { style: string; currency: string; }) => any; }) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const onGlobalFilterChange = (e: { target: { value: any; }; }) => {
        const value = e.target.value;
        const _filters = { ...filters };

        if (_filters['global']) {
            _filters['global'].value = value;
        }

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      doctorId: '',
      patientId: user.profileId,
      appointmentTime: new Date(),
        reason: '',
        notes: "",
    },

    validate: {
      doctorId: (value)=>!value ? 'Doctor is required': undefined,
      appointmentTime: (value) => !value ? 'Appointment Time is required': undefined,
      reason: (value) => !value ? 'Reason is required': undefined,
     
    },
  });

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-between items-center">
                <Button icon={<IconPlus />} onClick={open}>Schedule Appointment</Button>
                
                    <TextInput leftSection={<IconSearch />} fw={500} value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
            </div>
        );
    };

    const countryBodyTemplate = (rowData: { country: { code: any; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }; }) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt="flag" src="https://primefaces.org/cdn/primereact/images/flag/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} style={{ width: '24px' }} />
                <span>{rowData.country.name}</span>
            </div>
        );
    };

    const representativeBodyTemplate = (rowData: { representative: any; }) => {
        const representative = rowData.representative;

        return (
            <div className="flex align-items-center gap-2">
                <img alt={representative.name} src={`https://primefaces.org/cdn/primereact/images/avatar/${representative.image}`} width="32" />
                <span>{representative.name}</span>
            </div>
        );
    };

    const representativeFilterTemplate = (options: { value: unknown; filterCallback: (arg0: any) => void; }) => {
        return (
            <React.Fragment>
                <div className="mb-3 font-bold">Agent Picker</div>
                <MultiSelect value={options.value} options={representatives} itemTemplate={representativesItemTemplate} onChange={(e) => options.filterCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" />
            </React.Fragment>
        );
    };

    const representativesItemTemplate = (option: { name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; image: any; }) => {
        return (
            <div className="flex align-items-center gap-2">
                <img alt={typeof option.name === 'string' ? option.name : String(option.name ?? '')} src={`https://primefaces.org/cdn/primereact/images/avatar/${option.image}`} width="32" />
                <span>{option.name}</span>
            </div>
        );
    };

    const dateBodyTemplate = (rowData: { date: any; }) => {
        return formatDate(rowData.date);
    };

    const dateFilterTemplate = (options: { value: Nullable<Date>; filterCallback: (arg0: Nullable<Date>, arg1: any) => void; index: any; }) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
    };

    const balanceBodyTemplate = (rowData: { balance: any; }) => {
        return formatCurrency(rowData.balance);
    };

    const balanceFilterTemplate = (options: { value: number | null | undefined; filterCallback: (arg0: number | null, arg1: any) => void; index: any; }) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />;
    };

    const statusBodyTemplate = (rowData: { status: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => {
        return <Tag value={rowData.status} severity={getSeverity(rowData.status)} />;
    };

    const statusFilterTemplate = (options: { value: unknown; filterCallback: (arg0: any, arg1: any) => void; index: any; }) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select One" className="p-column-filter" showClear />;
    };

    const statusItemTemplate = (option: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined) => {
        return <Tag value={option} severity={getSeverity(option)} />;
    };

    const activityBodyTemplate = (rowData: { activity: string | number | null | undefined; }) => {
        return <ProgressBar value={rowData.activity} showValue={false} style={{ height: '6px' }}></ProgressBar>;
    };

    const activityFilterTemplate = (options: { value: number | (string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined)[] | undefined; filterCallback: (arg0: number | [number, number]) => void; }) => {
        return (
            <>
                <Slider
                    value={
                        Array.isArray(options.value) && options.value.length === 2
                            ? [Number(options.value[0]), Number(options.value[1])]
                            : [0, 100]
                    }
                    onChange={(e) => options.filterCallback(e.value)}
                    range
                    className="m-3"
                ></Slider>
                <div className="flex align-items-center justify-content-between px-2">
                    <span>{Array.isArray(options.value) ? options.value[0] : 0}</span>
                    <span>{Array.isArray(options.value) ? options.value[1] : 100}</span>
                </div>
            </>
        );
    };

    const actionBodyTemplate = () => {
        return <Button type="button" icon="pi pi-cog" rounded></Button>;
    };

    const header = renderHeader();
    const handleSubmit=(values: any)=> {
        console.log("Appointment scheduled with values:" ,values)
        setLoading(true);
        scheduleAppointment(values).then((data)=>{
            close();
            form.reset();
            successNotification("Appointment scheduled successfully");
        }).catch((error)=>{
            
            errorNotification(error.response?.data?.errorMessage || "Failed to schedule appointment");
        }).finally(()=>{
            setLoading{false};

        });

    }

    return (
        <div className="card">
            <DataTable value={customers} paginator header={header} rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    rowsPerPageOptions={[10, 25, 50]} dataKey="id" selectionMode="checkbox" selection={selectedCustomers} onSelectionChange={(e) => setSelectedCustomers(e.value)}
                    filters={filters} filterDisplay="menu" globalFilterFields={['name', 'country.name', 'representative.name', 'balance', 'status']}
                    emptyMessage="No customers found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="name" header="Name" sortable filter filterPlaceholder="Search by name" style={{ minWidth: '14rem' }} />
                <Column field="country.name" header="Country" sortable filterField="country.name" style={{ minWidth: '14rem' }} body={countryBodyTemplate} filter filterPlaceholder="Search by country" />
                <Column header="Agent" sortable sortField="representative.name" filterField="representative" showFilterMatchModes={false} filterMenuStyle={{ width: '14rem' }}
                    style={{ minWidth: '14rem' }} body={representativeBodyTemplate} filter filterElement={representativeFilterTemplate} />
                <Column field="date" header="Date" sortable filterField="date" dataType="date" style={{ minWidth: '12rem' }} body={dateBodyTemplate} filter filterElement={dateFilterTemplate} />
                <Column field="balance" header="Balance" sortable dataType="numeric" style={{ minWidth: '12rem' }} body={balanceBodyTemplate} filter filterElement={balanceFilterTemplate} />
                <Column field="status" header="Status" sortable filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusFilterTemplate} />
                <Column field="activity" header="Activity" sortable showFilterMatchModes={false} style={{ minWidth: '12rem' }} body={activityBodyTemplate} filter filterElement={activityFilterTemplate} />
                <Column headerStyle={{ width: '5rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center', overflow: 'visible' }} body={actionBodyTemplate} />
            </DataTable>

        <Modal opened={opened} size="lg" onClose={close} title={<div className='text-xl font-semibold primary-500'>Scheduled Appointment</div>} centered>
         <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            <form onSubmit={form.onSubmit(handleSubmit)} className='grid grid-cols-1 gap-5'>
            <Select {...form.getInputProps("doctorId")} withAsterisk data={doctors} label="Doctor" placeholder="Select one Doctor" />
             <DateTimePicker minDate={new Date} {...form.getInputProps("appointmentTime")} withAsterisk label="Appointment Time" placeholder="Pick date and time for Appointment" />;
             <Select {...form.getInputProps("reason")} data={appointmentReasons} withAsterisk label="Reason For Appointment" placeholder="Enter the reason for your appointment" />;
             <Textarea {...form.getInputProps("notes")} label="Additional notes" placeholder="Additional notes" />;
             <Button type="submit">Submit</Button>
            </form>
            </Modal>
        </div>
    );
}

export default Appointment;