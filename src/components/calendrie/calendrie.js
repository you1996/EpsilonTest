import React, { useState } from "react";
import * as dateFns from "date-fns";
import { fr } from "date-fns/locale";

//COmponents
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TodayIcon from "@mui/icons-material/Today";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
//theme and datepicker
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

//Icons
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import HomeWorkIcon from "@mui/icons-material/HomeWorkOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SearchIcon from "@mui/icons-material/Search";

//data
import {evenements , categories} from "./tables"
const theme = createTheme({
	palette: {
		Main: "#E50011",
		primary: { main: "#E50011" },
		Secondary: "#636363",
		Third: "#ECECEC",
		visite: {
			main: "#800101",
		},
		entretien: { main: "#C11BDC" },
		jobdating: { main: "#FFF505" },
		evenemententreprise: { main: "#EF960B" },
		emploi: { main: "#03C138" },
		collectives: { main: "#01D6D6" },
		formation: { main: "#FF00B8" },
		forum: { main: "#E50011" },
		rencontremetier: { main: "#2F04D8" },
		atelie: { main: "#000000" },
	},
	typography: {
		fontFamily: `DIN`,
		textTransform: "lowercase",
	},
});
theme.typography.h7 = {
	fontSize: "13px",
};
theme.typography.h5 = {
	fontSize: "30px",
};
//Search custom field
const Search = styled(Box)(({ theme }) => ({
	borderRadius: "7px",
	color: theme.palette.Secondary,
	border: "1px solid",
	borderColor: theme.palette.Third,
	textTransform: "none",
	backgroundColor: "white",
	padding: 9,
	height: "auto",
}));
//custom css for locationSearch
const LocationSearch = styled(Box)(({ theme }) => ({
	backgroundColor: "transparent",
	borderRadius: "10px",
	color: theme.palette.atelie,
	border: "1px solid",
	borderColor: theme.palette.atelie,
	textTransform: "none",
	paddingBottom: 13,
	height: "20px",
}));
//Input for datepicker
const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	width: "100%",
	color: "black",
	marginLeft: 8,
}));
//ToggleButton for select vuemode
const CustomToggleButton = styled(ToggleButton)(({ theme }) => ({
	textTransform: "lowercase",
}));
//badge for info tooltip(categories)
const StyledBadge = styled(Badge)(({ theme }) => ({
	color: theme.palette.Secondary,
	borderColor: theme.palette.Secondary,
	textTransform: "none",
	width: "100%",
	position: "relative",
	boder: "7px solid",
	position: "relative",
}));
//Button for selecting calendar vue
const ColorButton = styled(Button)(({ theme }) => ({
	borderRadius: "9px",
	color: theme.palette.Secondary,
	border: "1px solid",
	borderColor: theme.palette.Third,
	textTransform: "none",
	width: "80px",
	"&:focus": {
		borderColor: theme.palette.Main,
	},
}));
//select userIdentity
const CustomButton = styled(Button)(({ theme }) => ({
	borderRadius: "9px",
	border: "1px solid",
	color: theme.palette.Secondary,
	borderColor: theme.palette.Secondary,
	textTransform: "none",
	width: "100%",
	height: "50px",
	padding: "0px",
	":focus": {
		borderColor: theme.palette.Main,
		backgroundColor: theme.palette.Main,
		color: "white",
	},
}));
//Cell to render date and event in table
const CustomTableCell = styled(TableCell)(({ theme }) => ({
	position: "relative",
	height: "6em",
	width: "12em",
	border: "1px solid",
	borderColor: theme.palette.Third,
	overflow: "hidden",
	padding: "10px",
}));
//span for date number
const Customspan = styled(Box)(({ theme }) => ({
	position: "absolute",
	fontSize: "82.5%",
	lineHeight: "1",
	top: "10px",
	left: ".75em",
	fontWeight: "700",
	color: theme.palette.Secondary,
}));
//useful for rendring things
const CustomBox = styled(Box)(({ theme }) => ({
	position: "relative",
	fontSize: "82.5%",
	padding: "15px",
	backgroundColor: theme.palette.Third,
	borderRadius: "15px",
}));
function Calendar() {
  //rendred month 
	const [currentMonth, setCurrentMonth] = useState(new Date());
  //selected date(from the datepicker)
	const [selectedDate, setSelectedDate] = useState(new Date());
  //selected vue mode
  const [alignment, setAlignment] = React.useState("vvvv");
  //selected user categorie(identity)
	const [userCategorie, setUserCategorie] = useState("Condidate");
  //Entred zone
	const [userZone, setUserZone] = useState("");
  /////////
  // renderHeader() is a function to render the datepicker , selected monthand buttons in a grid
  //
  ////////
	const renderHeader = () => {
		const dateFormat = "MMMM";
		const renderDateString = (props) => (
			<ThemeProvider>
				<TextField
					value={dateFns.format(new Date(props.inputProps.value), "EEEE d MMMM", { locale: fr })}
					inputRef={props.inputRef}
					InputProps={props.InputProps}
				/>
			</ThemeProvider>
		);
		return (
			<div>
				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={4}>
						<Grid item xs>
							<ThemeProvider>
								<LocalizationProvider dateAdapter={AdapterDateFns} locale={fr}>
									<DesktopDatePicker
										className="datapicker"
										value={selectedDate}
										inputFormat="yyyy-MM-dd"
										minDate={new Date("2017/01/01")}
										onChange={(newValue) => {
											setSelectedDate(newValue);
											setCurrentMonth(newValue);
										}}
										renderInput={renderDateString}
									/>
								</LocalizationProvider>
							</ThemeProvider>
						</Grid>
						<Grid item xs={4}>
							<IconButton aria-label="settings" onClick={prevMonth}>
								<ChevronLeftIcon />
							</IconButton>
							<span>{dateFns.format(currentMonth, dateFormat, { locale: fr })}</span>
							<IconButton aria-label="settings" onClick={nextMonth}>
								<ChevronRightIcon />
							</IconButton>
						</Grid>
						<Grid item xs>
							<Grid container spacing={3}>
								<Grid item>
									<ColorButton>Année</ColorButton>
								</Grid>
								<Grid item>
									{" "}
									<ColorButton>Mois</ColorButton>
								</Grid>
								<Grid item>
									<ColorButton>Jour</ColorButton>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</div>
		);
	};

  ///////
  //renderDays() reenders the day list after format in an horizontal grid
  /////
	const renderDays = () => {
		const dateFormat = "eeee";
		const days = [];
		let startDate = dateFns.startOfWeek(currentMonth);
    //loop day of the week=8
		for (let i = 1; i < 8; i++) {
			days.push(
				<TableCell align="center">
					{dateFns.format(dateFns.addDays(startDate, i), dateFormat, {
						locale: fr,
					})}
				</TableCell>
			);
		}
		return (
			<TableHead>
				<TableRow>{days}</TableRow>
			</TableHead>
		);
	};

//////////
//renderPper() returns the background paper for the calendar
//
/////////
	const renderpaper = () => {
    //changes the state declared for vuemode
		const handleChange = (event, newAlignment) => {
			setAlignment(newAlignment);
		};
		return (
			<Stack spacing={0.5} sx={{ fontWeight: "bold", ml: 20 }}>
				<Paper
					elevation={3}
					sx={{
						my: 1,
						mx: 9,
						pl: 21,
						pb: 5,
						textAlign: "left",
						borderRadius: "25px 25px 0 0 ",
					}}>
					<Typography variant="h6" color="atelie">
						{" "}
						<Box sx={{ fontWeight: "bold" }}>Veuillez selectionner votre mode d'affichage favoris:</Box>
					</Typography>
					<ToggleButtonGroup color="atelie" value={alignment} exclusive onChange={handleChange}>
						<CustomToggleButton value="vvvv">
							<TodayIcon color="primary" />{" "}
							<Typography variant="h7" textAlign="left" color="atelie">
								<Box sx={{ fontWeight: "bold", ml: 1 }}>vvvv</Box>
							</Typography>{" "}
						</CustomToggleButton>
						<CustomToggleButton value="vue liste">
							<FormatListBulletedIcon color="primary" />
							<Typography variant="h7" textAlign="left" color="atelie">
								<Box sx={{ textTransform: "none", fontWeight: "bold", ml: 1 }}>Vue liste</Box>
							</Typography>
						</CustomToggleButton>
					</ToggleButtonGroup>
				</Paper>
			</Stack>
		);
	};

//////////
//rendersCell() it returns the cells of the table, the events in the dedicated date
/////////
	const renderCells = (evenements) => {
    //initialize all reference days
		const monthStart = dateFns.startOfMonth(currentMonth);
		const monthEnd = dateFns.endOfMonth(monthStart);
		const startDate = dateFns.startOfWeek(monthStart, { weekStartsOn: 1 });
		const endDate = dateFns.endOfWeek(monthEnd);
    //format for dateFns.format()
		const dateFormat = "d";
		const rows = [];

		let days = [];
		let day = startDate;
		let formattedDate = "";
    //usefull for the cells backgroundcolor
		const bgcolor = () => {
			return {
				border: "3px solid",
				borderColor: "rgba(255, 79, 20, 0.4)",
				bgcolor: "rgba(255, 98, 85, 0.1)",
			};
		};
    //go through all month days
		while (day <= endDate) {
      //go through day of the week
			for (let i = 1; i < 8; i++) {
				formattedDate = dateFns.format(day, dateFormat);
				const cloneDay = day;
        //change the background color if it's today
				if (
					dateFns.format(day, "PP", { locale: fr }) ==
					dateFns.format(new Date(new Date().setHours(0, 0, 0, 0)), "PP", {
						locale: fr,
					})
				) {
					days.push(
						<CustomTableCell
							key={day}
							style={{ backgroundColor: "none" }}
							sx={{ bgcolor: "Third" }}>
							{dateFns.isSameMonth(day, monthStart) ? (
								<Customspan>{formattedDate}</Customspan>
							) : (
								<Customspan sx={{ color: "Third" }}>{formattedDate}</Customspan>
							)}
              {evenements.map(function (evenement, i) {
								if (dateFns.format(day, "PP", { locale: fr }) == evenement.date) {
									console.log(typeof evenement.categorie);
									return (
										<Chip
											style={{ width: "auto", height: "25px" }}
											avatar={
												<Avatar
													style={{ width: "10px", height: "12px" }}
													sx={{ bgcolor: evenement.categorie + ".main" }}>
													{" "}
												</Avatar>
											}
											label={
												<Typography variant="h7" align="left" color="Secondary">
													{evenement.nom}{" "}
												</Typography>
											}
										/>
									);
								}
							})}
						</CustomTableCell>
					);
				}
        //change background color for the selected date from the datepicker 
        else if (
					dateFns.format(day, "PP", { locale: fr }) == dateFns.format(selectedDate, "PP", { locale: fr })
				) {
					days.push(
						<CustomTableCell key={day} sx={{ ...bgcolor() }}>
							{dateFns.isSameMonth(day, monthStart) ? (
								<Customspan>{formattedDate}</Customspan>
							) : (
								<Customspan sx={{ color: "Third" }}>{formattedDate}</Customspan>
							)}
              {/* we loop through all events and if it matches the date
                  then we return a chip with the name and the color
              */}
              {evenements.map(function (evenement, i) {
								if (dateFns.format(day, "PP", { locale: fr }) == evenement.date) {
									console.log(typeof evenement.categorie);
									return (
										<Chip
											style={{ width: "auto", height: "25px" }}
											avatar={
												<Avatar
													style={{ width: "10px", height: "12px" }}
													sx={{ bgcolor: evenement.categorie + ".main" }}>
													{" "}
												</Avatar>
											}
											label={
												<Typography variant="h7" align="left" color="Secondary">
													{evenement.nom}{" "}
												</Typography>
											}
										/>
									);
								}
							})}
						</CustomTableCell>
					);
				}
        //non special cell
        else {
					days.push(
						<CustomTableCell
							style={{ backgroundColor: "none" }}
							key={day}>
							{dateFns.isSameMonth(day, monthStart) ? (
								<Customspan>{formattedDate}</Customspan>
							) : (
								<Customspan sx={{ color: "Third" }}>{formattedDate}</Customspan>
							)}
							{evenements.map(function (evenement, i) {
								if (dateFns.format(day, "PP", { locale: fr }) == evenement.date) {
									console.log(typeof evenement.categorie);
									return (
										<Chip
											style={{ width: "auto", height: "25px" }}
											avatar={
												<Avatar
													style={{ width: "10px", height: "12px" }}
													sx={{ bgcolor: evenement.categorie + ".main" }}>
													{" "}
												</Avatar>
											}
											label={
												<Typography variant="h7" align="left" color="Secondary">
													{evenement.nom}{" "}
												</Typography>
											}
										/>
									);
								}
							})}
						</CustomTableCell>
					);
				}
				day = dateFns.addDays(day, 1);
			}
			rows.push(<TableRow>{days}</TableRow>);
			days = [];
		}
		return <TableBody>{rows}</TableBody>;
	};

  ////////////
  // renderFiler() to render the search button, the categorie and the user identity select area
  //
  ///////////
	const renderFilter = (categories) => {
		let events = [];
		Object.keys(categories).forEach((key) => {
			events.push(
				<Grid item xs={6} md={6}>
					<Grid xs={12} md={12}>
						
					

					<Grid item xs={12} md={12}>
          <Tooltip title="description de catégorie" placement="top-end">
							<StyledBadge
								anchorOrigin={{ vertical: "top", horizontal: "right" }}
								badgeContent={
									<Avatar style={{ width: "16px", height: "16px" }} sx={{ bgcolor: "Third" }}>
										<InfoOutlinedIcon
											sx={{ color: "#000000" }}
											style={{ width: "16px", height: "16px" }}
										/>
									</Avatar>
								}
								overlap="circular"></StyledBadge>
						</Tooltip>
						<Box sx={{ flexGrow: 1 }}>
							<CustomButton>
								<Grid container spacing={0} alignItems="center" justifyContent="space-evenly">
									<Grid item xs={2} md={2} align="centre">
										<Badge color={categories[key].color} badgeContent=" "></Badge>
									</Grid>
									<Grid item xs={10} md={10} align="left">
										<Typography variant="h7" align="left" color="Secondary">
											{categories[key].nom}
										</Typography>
									</Grid>
								</Grid>
							</CustomButton>
						</Box>
					</Grid>
          </Grid>
				</Grid>
			);
		});

		return (
			<Stack spacing={2}>
				<Search>
					<Grid container spacing={0} direction="row" justifyContent="flex-start" alignItems="center">
						<Grid item xs={1} md={1}>
							<SearchIcon />
						</Grid>
						<Grid item xs={11} md={11}>
							<StyledInputBase placeholder="Rechercher un type d'événement" />
						</Grid>
					</Grid>
				</Search>
				<Typography variant="h6" align="left" color="Secondary">
					Filters:
				</Typography>
				<Divider />

				<Typography variant="subtitle1" align="left">
					Je suis:
				</Typography>
				<CustomBox>
					<Grid container spacing={2}>
						<Grid item xs={6} md={6}>
							<CustomButton>
								<PersonIcon />
								Condidat
							</CustomButton>
						</Grid>
						<Grid item xs={6} md={6}>
							<CustomButton>
								<HomeWorkIcon />
								Entreprise
							</CustomButton>
						</Grid>
						<Grid item xs={6} md={6}>
							<CustomButton>Partenaire</CustomButton>
						</Grid>
					</Grid>
				</CustomBox>

				<Divider />
				<Typography variant="subtitle1" align="left">
					Categories:
				</Typography>
				<CustomBox>
					<Grid container spacing={2}>
						{events}
					</Grid>
				</CustomBox>
				<Divider />
				<Typography variant="subtitle1" align="left">
					Communes:
				</Typography>
				<CustomBox>
					<LocationSearch>
						<Grid container spacing={0} direction="row" justifyContent="flex-start" alignItems="center">
							<Grid item xs={1} md={1}>
								<SearchIcon />
							</Grid>
							<Grid item xs={11} md={11}>
								<StyledInputBase placeholder="Saissiez votre localisation" />
							</Grid>
						</Grid>
					</LocationSearch>
				</CustomBox>
			</Stack>
		);
	};
///////changes the rendered month///////
	const nextMonth = () => {
		setCurrentMonth(dateFns.addMonths(currentMonth, 1));
	};
	const prevMonth = () => {
		setCurrentMonth(dateFns.subMonths(currentMonth, 1));
	};
///////
	return (
		<ThemeProvider theme={theme}>
			<Stack spacing={0.5} sx={{ gap: 2, px: 10 }}>
				<Typography variant="h5" textAlign="left" color="Main">
					{" "}
					<Box sx={{ fontWeight: "bold", ml: 30 }}>|Événements à venir</Box>
				</Typography>
				{renderpaper()}
				<Grid container spacing={6}>
					<Grid item xs={8} md={8} pt={0}>
						{renderHeader()}
						<Paper elevation={0}>
							<Table>
								{renderDays()}
								{renderCells(evenements)}
							</Table>
						</Paper>
					</Grid>
					<Grid item xs={3} md={3}>
						{renderFilter(categories)}
					</Grid>
				</Grid>
			</Stack>
		</ThemeProvider>
	);
}

export default Calendar;
