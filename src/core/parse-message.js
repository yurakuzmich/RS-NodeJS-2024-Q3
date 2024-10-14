export const parseMessage = (message, fields, values) => {
    fields.forEach((field, index) => {
        message = message.replace(`%${field}%`, values[index]);
    });

    return message;
}