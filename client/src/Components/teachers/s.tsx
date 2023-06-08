import { useState, useEffect, useContext, useCallback, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Tab, Tabs, Box } from "@material-ui/core";
import UserManagementGrid from "./userManagementGrid/UserManagementGrid";
import { ADMIN_DASHBOARD_HEADER } from "../../../../constants/caption/dashboardHeader";
import { AuthContext, UIContext } from "../../../../contexts";
import { api } from "../../../../utils/api";
import TabPanel from "../../../shared/tabPanelComponent/TabPanel.jsx";
import a11yProps from "../../../../constants/tabPanelProps/ayProps";
import useRouteParam from "../../../../hooks/useRouteParam";
import ROLES from "../../../../constants/roles";

import PersonAddIcon from "@material-ui/icons/PersonAdd";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./userManagement.css";
import { useEmployerRoute, useEnroller } from "../../../../hooks";
import { trackPromise } from "react-promise-tracker";

const UserManagement = () => {
    const { isEnroller } = useEnroller();
    const [enabledGroupOwners, setEnabledGroupOwners] = useState<any[]>([]);
    const [disabledGroupOwners, setDisabledGroupOwners] = useState<any[]>([]);
    const [value, setValue] = useState<number>(0);
    const navigate = useNavigate();
    const isEmployerRoute = useEmployerRoute();
    const { user } = useContext(AuthContext);
    const queryGroupNumber = useRouteParam("gn");
    const { setDashboardHeader, setSelectedTab } = useContext(UIContext);
    const [userApprovalFilterSchema, setUserApprovalFilterSchema] = useState({
        user_id: { value: null, type: null },
        alternate_id: { value: null, type: null },
        first_name: { value: null, type: null },
        middle_name: { value: null, type: null },
        last_name: { value: null, type: null },
        user_name: { value: null, type: null },
        password: { value: null, type: null },
        role: { value: null, type: null },
        email: { value: null, type: null },
        SSN: { value: null, type: null },
        date_of_birth: { value: null, type: null },
        gender: { value: null, type: null },
        marital_status: { value: null, type: null },
        city: { value: null, type: null },
        state: { value: null, type: null },
        country: { value: null, type: null },
        ZIP: { value: null, type: null },
        address_line_1: { value: null, type: null },
        address_line_2: { value: null, type: null },
        contact_label: { value: null, type: null },
        mobile: { value: null, type: null },
        phone_extension: { value: null, type: null },
        is_verified: { value: null, type: null },
        is_locked_out: { value: null, type: null },
        is_active: { value: null, type: null },
        is_inactive: { value: null, type: null },
        is_online: { value: null, type: null },
        approved_by: { value: null, type: null },
        created_by: { value: null, type: null },
        is_approved: { value: null, type: null },
        is_registered: { value: null, type: null },
        assigned_groups: { value: null, type: null },
        security_question: { value: null, type: null },
        security_answer: { value: null, type: null },
        date: { value: null, type: null },
        last_login_date: { value: null, type: null },
        is_member_support: { value: null, type: null },
        is_employer_support: { value: null, type: null },
        hire_date: { value: null, type: null },
        upload_type: { value: null, type: null },
        claim_notification: { value: null, type: null }
    });

    const handleLabelChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setValue(value);
    };

    const handleAddUserClick = useCallback(() => {
        const pathname = isEmployerRoute === true ? `/employer/create-user?gn=${queryGroupNumber}` : "/create-user";
        navigate(pathname);
    }, [isEmployerRoute, navigate, queryGroupNumber]);

    const getGroupOwners = useCallback(async () => {
        let _groupOwners: any[] = [];
        if (isEmployerRoute === true) {
            _groupOwners = await trackPromise(
                api.user.getEmployers({ group_number: queryGroupNumber, role: ROLES.employer })
            );
        } else {
            _groupOwners = await trackPromise(api.user.getAssignedGroupOwners({}));
        }
        const _enabledGroupOwners: any[] = [];
        const _disabledGroupOwners: any[] = [];
        _groupOwners.forEach((_groupOwner: any) => {
            if (_groupOwner.is_disabled) {
                _disabledGroupOwners.push(_groupOwner);
            } else {
                _enabledGroupOwners.push(_groupOwner);
            }
        });
        setEnabledGroupOwners(Object.assign([], _enabledGroupOwners));
        setDisabledGroupOwners(Object.assign([], _disabledGroupOwners));
    }, [isEmployerRoute, queryGroupNumber]);

    useEffect(() => {
        setDashboardHeader(ADMIN_DASHBOARD_HEADER.user_management);
        if (isEmployerRoute !== null) {
            getGroupOwners();
        }
    }, [getGroupOwners, setDashboardHeader, isEmployerRoute]);

    return (
        <div id="user-approval" className="user-approval">
            {isEnroller ? null : (
                <div className="pf-action-button-container" id="pf-action-button-container">
                    <Button
                        className="button-green"
                        onClick={handleAddUserClick}
                        variant="contained"
                        style={{
                            cursor: "pointer",
                            pointerEvents: "unset"
                        }}
                    >
                        <span className="button-label-with-icon">Add User</span>
                        <span>
                            <PersonAddIcon className="button-icon" />
                        </span>
                    </Button>
                </div>
            )}
            <div className="user-management-tab-panel-container ">
                <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <Tabs
                            value={value}
                            onChange={handleLabelChange}
                            aria-label="basic tabs example"
                            TabIndicatorProps={{
                                style: {
                                    border: "none",
                                    backgroundColor: "#558b2f"
                                }
                            }}
                            className="glb-tab-panel"
                        >
                            <Tab label={"Enabled User"} className="glb-tab-label" {...a11yProps(0)} />
                            <Tab label={"Disabled User"} className="glb-tab-label" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <Suspense fallback={<div />}>
                            <UserManagementGrid
                                gridData={enabledGroupOwners}
                                gridFilterSchema={userApprovalFilterSchema}
                                setGridFilterSchema={setUserApprovalFilterSchema}
                            />
                        </Suspense>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Suspense fallback={<div />}>
                            <UserManagementGrid
                                gridData={disabledGroupOwners}
                                gridFilterSchema={userApprovalFilterSchema}
                                setGridFilterSchema={setUserApprovalFilterSchema}
                            />
                        </Suspense>
                    </TabPanel>
                </Box>
            </div>
            {/* <div className="custom-pagination" id="custom-pagination">
                <CustomPagination pageCount={pageCount} currentPage={currentPage} handlePageChange={handlePageChange} />
            </div> */}
        </div>
    );
};

export default UserManagement;