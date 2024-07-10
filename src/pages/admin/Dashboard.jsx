import React, { useEffect, useState } from 'react'
import {
    useGetAdminUsersQuery,
    useLazyGetAdminUserUrlsQuery,
    useUpdateAdminUserMutation
} from '../../redux/api\'s/adminApi'
import { toast } from 'react-toastify'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useLogoutMutation } from '../../redux/api\'s/authApi';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [selectedUser, setselectedUser] = useState()
    const { data, isError: getIsError, error: getError } = useGetAdminUsersQuery()
    const [userUrls, { data: urlData }] = useLazyGetAdminUserUrlsQuery()
    const [updateUser, { isSuccess, error, isError }] = useUpdateAdminUserMutation()
    const [logout] = useLogoutMutation()
    useEffect(() => {
        if (isSuccess) toast.success("Profile Update SUccess")
    }, [isSuccess])
    useEffect(() => {
        if (isError) toast.error(error)
    }, [isError])
    useEffect(() => {
        if (getIsError && getError === 401) {
            toast.error("Logout Success")
            logout()
        }
    }, [getIsError])
    // console.log(error)
    return <>
        <div className="container">
            <div className="row">
                <div className="col-sm-4">
                    <UsersStat />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4 ">

                    <div className=''>
                        {
                            data && data.map(item => <ul className="list-group">
                                <li onClick={e => userUrls(item._id)} className="list-group-item d-flex justify-content-between">{item.name} <button type="button" onClick={e => setselectedUser(item)} className="btn btn-warning btn-sm">Edit</button></li>

                            </ul>)
                        }
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className=''>
                        <ul class="list-group">
                            {
                                urlData && urlData.map(item => <li class="list-group-item d-flex justify-content-between">
                                    <span>{item.longUrl}</span>
                                    <span className='badge text-bg-primary'>{item.count}</span>
                                </li>)
                            }
                        </ul>
                    </div>
                </div>
                <div className="col-sm-4">
                    {
                        selectedUser && <div className="card">
                            <div className="card-header">{selectedUser.name}</div>
                            <div className="card-body">
                                <div>
                                    <label htmlFor="name" className="form-label">First name</label>
                                    <input onChange={e => setselectedUser({ ...selectedUser, name: e.target.value })} value={selectedUser.name} type="text" className="form-control" id="name" placeholder="Enter Your Name" />
                                    <div className="valid-feedback">Looks good!</div>
                                    <div className="invalid-feedback">Please choose a username.</div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="form-label">First Email</label>
                                    <input onChange={e => setselectedUser({ ...selectedUser, email: e.target.value })} value={selectedUser.email} type="text" className="form-control" id="name" placeholder="Enter Your Email" />
                                    <div className="valid-feedback">Looks good!</div>
                                    <div className="invalid-feedback">Please choose a username.</div>
                                </div>
                                <div className="form-check form-switch my-2">
                                    <input checked={selectedUser.active} onChange={e => setselectedUser({ ...selectedUser, active: e.target.checked })} className="form-check-input" type="checkbox" id="id" />
                                    <label className="form-check-label" htmlFor="id">Account</label>
                                </div>

                                <button onClick={e => {
                                    updateUser(selectedUser)
                                    setselectedUser(null)
                                }} type="button" className="btn btn-primary">Update Profile</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>

    </>
}


const UsersStat = () => {
    const { data: data2 } = useGetAdminUsersQuery()
    const deactivated = data2 && data2.filter(item => !item.active).length
    const activated = data2 && data2.filter(item => item.active).length
    const data = {
        labels: ['De-Activate', 'Activate'],
        datasets: [
            {
                label: 'User',
                data: [deactivated, activated],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };


    return <Pie data={data} />
}


export default Dashboard