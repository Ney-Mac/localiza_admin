import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { SvgIcon } from '@mui/material';
import LogoIcon from 'src/components/logoWithoutColor';

export const items = [
	{
		title: 'Visão Geral',
		path: '/',
		icon: (
			<SvgIcon fontSize="small">
				<ChartBarIcon />
			</SvgIcon>
		)
	},
	{
		title: 'Pontos',
		path: '/points',
		icon: (
			<SvgIcon fontSize="small">
				<LogoIcon />
			</SvgIcon>
		)
	},
	{
		title: 'Usuários',
		path: '/users',
		icon: (
			<SvgIcon fontSize="small">
				<UsersIcon />
			</SvgIcon>
		)
	},
	{
		title: 'Empresas',
		path: '/companies',
		icon: (
			<SvgIcon fontSize="small">
				<ShoppingBagIcon />
			</SvgIcon>
		)
	},
	{
		title: 'Minha Conta',
		path: '/account',
		icon: (
			<SvgIcon fontSize="small">
				<UserIcon />
			</SvgIcon>
		)
	},
	{
		title: 'Definições',
		path: '/settings',
		icon: (
			<SvgIcon fontSize="small">
				<CogIcon />
			</SvgIcon>
		)
	}
];
