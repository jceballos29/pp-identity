import {
	ConfigProvider,
	App,
	Typography,
	Divider,
	Space,
	Button,
} from 'antd';
import { gray, geekblue } from '@ant-design/colors';

function Main() {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: geekblue.primary,
					borderRadius: 4,
					colorTextBase: gray[11],
          // fontFamily: 'Montserrat, sans-serif', // Cambia la fuente principal aquí
          // fontFamily: 'Poppins, sans-serif', // Cambia la fuente principal aquí
          // fontFamily: 'Inter, sans-serif', // Cambia la fuente principal aquí
          fontFamily: 'Noto Sans, sans-serif', // Cambia la fuente principal aquí
          // codeFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace', // Puedes cambiar la fuente de código si lo deseas
          // headingFontFamily: 'Montserrat, sans-serif', // Puedes definir una fuente de encabezado diferente o dejar que herede de fontFamily
				},
			}}
		>
			<App>
				<Typography.Title>Ant Design</Typography.Title>
				<Divider />
				<Space>
					<Button type='primary'>Primary</Button>
					<Button>Default</Button>
				</Space>
			</App>
		</ConfigProvider>
	);
}

export default Main;
