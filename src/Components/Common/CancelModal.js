import { Form, Input, message, Modal } from 'antd';
import nepalify from 'nepalify';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppDefaultSettings } from '../../Config/AppDefaultSettings';
import { setCancelRouteByAdminApi } from '../../Services/RouteService';
import { nepaliOptions } from './ChangeText';

const CancelModal = (props) => {
    const { showModal, hideModal, sendCancelData, shouldTableRefresh } = props
    const { TextArea } = Input
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm()
    const appDefNep = AppDefaultSettings.removeFromNepali
    const { i18n } = useTranslation();

    const handleSubmit = (res) => {
        setConfirmLoading(true);
        const data = {
            vehicleid: sendCancelData.VehicleId,
            receiptid: sendCancelData.DId,
            remarks: res.remarks
        }
        setCancelRouteByAdminApi(data, (res) => {
            if (res?.SuccessMsg === true) {
                message.success(res.Message)
                form.resetFields()
                hideModal(false);
                shouldTableRefresh(true)
            } else {
                message.error('Something went wrong')
            }
            setConfirmLoading(false);
        })
    }

    const handleCancel = () => {
        hideModal(false);
        setConfirmLoading(false);
    };

    const handleFail = () => {
        setConfirmLoading(false)
    }

    const onValuesChange = (res) => {
        if(i18n.language === 'np' && !appDefNep.includes(Object.keys(res)[0]))
        form.setFieldsValue({
            [Object.keys(res)[0]]: nepalify.format(Object.values(res)[0], nepaliOptions)
        })
    }

    return (
        <>
            <Modal
                title="Cancel Receipt"
                visible={showModal}
                onOk={form.submit}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    name="cancel_receipt"
                    autoComplete="off"
                    onFinish={handleSubmit}
                    onFinishFailed={handleFail}
                    layout={'vertical'}
                    onValuesChange={onValuesChange}
                >
                    <Form.Item
                        name="remarks"
                        label="Remarks"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter remarks!',
                            },
                        ]}
                    >
                        <TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CancelModal;