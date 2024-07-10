import React, { useEffect, useState } from 'react'
import { useAddUrlMutation, useDeleteUrlMutation, useGetUrlQuery, useUpdateUrlMutation } from '../../redux/api\'s/userApi'
import { toast } from 'react-toastify'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useLogoutMutation } from '../../redux/api\'s/authApi';
import { useSelector } from 'react-redux';
ChartJS.register(ArcElement, Tooltip, Legend);


const Account = () => {
    const [url, seturl] = useState({})
    const [addUrl, { isError, error, isSuccess }] = useAddUrlMutation()
    const { user } = useSelector(state => state.auth)
    const [updateUrl] = useUpdateUrlMutation()
    const handleChange = e => {
        const { name, value } = e.target
        seturl({ ...url, [name]: value })
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("URL Create Success")
        }
    }, [isSuccess])
    useEffect(() => {
        if (isError) {
            toast.error(JSON.stringify(error))
        }
    }, [isError])

    return <div className='alert alert-info'>
        <div className="container">
            <div className="row">
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-header">Short Link</div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div>
                                        <label htmlFor="longUrl" className="form-label">Paste a Long URL</label>
                                        <input onChange={handleChange} type="text" className="form-control" name="longUrl" placeholder="Example: http://www.google.com" />
                                        <div className="valid-feedback">Looks good!</div>
                                        <div className="invalid-feedback">Please choose a username.</div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div>
                                        <label htmlFor="label" className="form-label">URL Label</label>
                                        <input onChange={handleChange} type="text" className="form-control" name="label" placeholder="Example: instagram" />
                                        <div className="valid-feedback">Looks good!</div>
                                        <div className="invalid-feedback">Please choose a username.</div>
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div>
                                        <label htmlFor="longUrl" className="form-label">Domain</label>
                                        <input disabled type="text" className="form-control" id="longUrl" value="http://localhost:5173" />
                                        <div className="valid-feedback">Looks good!</div>
                                        <div className="invalid-feedback">Please choose a username.</div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div>
                                        <label htmlFor="shortUrl" className="form-label">Enter a Back-Half</label>
                                        <input onChange={handleChange} type="text" className="form-control" name="shortUrl" placeholder="Example: favorite-link" />
                                        <div className="valid-feedback">Looks good!</div>
                                        <div className="invalid-feedback">Please choose a username.</div>
                                    </div>
                                </div>

                                <div className="col-sm-12">
                                    <div className="alert alert-info my-3">
                                        <strong className='bi bi-magic my-3'></strong>
                                        End Your Link With Words That Will Make It Unique
                                    </div>
                                </div>

                            </div>
                            <button onClick={e => addUrl({ ...url, userId: user._id })} type="submit" className="btn btn-primary btn-lg ">Generate Short URL</button>
                        </div>

                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">
                            <Stat />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <UrlTable />

    </div>
}

const UrlTable = () => {
    const [deleteUser] = useDeleteUrlMutation()
    const [updateUrl] = useUpdateUrlMutation()
    const [updateData, setupdateData] = useState({})
    const { user } = useSelector(state => state.auth)
    const { data } = useGetUrlQuery(user._id)
    // console.log(data);
    const handleUpdate = e => {
        const { name, value } = e.target
        setupdateData({ ...updateData, [name]: value })
    }
    return data && <div className='alert alert-info'>
        <div className='container mt-5'>
            <div className="table-respponsive">
                <table className='table table-bordered table-warning'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Visit</th>
                            <th>Short url</th>
                            <th>Label</th>
                            <th>long url</th>
                            <th>count</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(item => <tr key={item._id}>
                                {/* <td>{`https://shortly-iemi.onrender.com/visit/${item.shortUrl}`}</td> */}
                                <td>{`http://localhost:5173/visit/${item.shortUrl}`}</td>
                                <td>
                                    <a className='btn btn-primary' target='_blank' href={`http://localhost:5173/visit/${item.shortUrl}`}>Visit</a>
                                </td>
                                <td>{item.shortUrl}</td>
                                <td>{item.label}</td>
                                <td>{item.longUrl}</td>
                                <td>{item.count}</td>
                                <td>
                                    <button onClick={e => setupdateData(item)} data-bs-toggle="modal" data-bs-target="#updateUrl" className='btn btn-warning mx-2'>Update</button>
                                    <button onClick={e => deleteUser(item._id)} className='btn btn-danger mx-2'>Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>











        <div className="modal fade" id="updateUrl" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        <input value={updateData.longUrl} onChange={handleUpdate} type="text" className="form-control" name='longUrl' placeholder="Enter Your Name" />
                        <input value={updateData.shortUrl} onChange={handleUpdate} type="text" className="form-control" name='shortUrl' placeholder="Enter Your Name" />

                    </div>
                    <div className="modal-footer">
                        <button onClick={e => updateUrl(updateData)} type="button" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


}

const Stat = () => {
    const { data: urlData, isError, error } = useGetUrlQuery()
    const [logout] = useLogoutMutation()
    useEffect(() => {
        if (isError) {
            if (error === 401) {
                logout()
            }
        }
    }, [isError])

    const data = {
        labels: urlData && urlData.map(item => item.label),
        datasets: [
            {
                label: '# of Visits',
                data: urlData && urlData.map(item => item.count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return <>
        <Doughnut data={data} />
    </>
}


export default Account