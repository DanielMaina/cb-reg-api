{/* <Form.Item className="form-item-group contact-group" label={<PhoneOutlined />}>
                    <Form.List name="contacts">
                        {(fields, { add, remove }) => (
                        <>
                            {fields.map(({name, key, ...restField}) => (
                            <div key={key}>
                                
                                <Form.Item
                                    {...restField}
                                    name={['name', 'name']}
                                    rules={[{ required: true }]}
                                >
                                    <Input placeholder='Name of the contact person' />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={['name', 'phone']}
                                    rules={[{ type: 'string' }]}
                                >
                                    <Input placeholder='Phone number' />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={['name', 'email']}
                                    rules={[{ type: 'email' }]}
                                >
                                    <Input placeholder='Email' />
                                </Form.Item>

                                <MinusCircleOutlined onClick={() => 
                                    remove(name)
                                } />
                            </div>
                        ))}
                        <div className="d-flex justify-content-between">
                            <Form.Item>
                                <Button className="add-more-contact-btn" onClick={() => add()}>
                                    + add contact
                                </Button>
                            </Form.Item>
                        </div>
                    </>
                    )}
                    </Form.List>
                </Form.Item> */}