import { useState } from "react";
import { Group, Text, NavLink, Container } from "@mantine/core";
import {
  IconHome,
  IconDashboard,
  IconFile,
  IconBriefcase,
  IconCreditCard,
  IconUser,
  IconUserPlus,
  IconSettingsCog,
  IconPlus,
  IconTable,
  IconBuilding,
  IconBarrierBlock,
  IconBuildingSkyscraper,
  IconCash,
  IconStar,
  IconTools,
  IconFile3d,
} from "@tabler/icons-react";
import classes from "./sidebar.module.css";

export function Navbar() {
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Container>
            <Text className={classes.headtext} c="white">
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "36px",
                }}
              >
                Property
              </span>
              <Text
                c="orange-pms"
                style={{
                  fontWeight: "700",
                  fontSize: "24px",
                  marginTop: "-13px",
                }}
              >
                Management
              </Text>
            </Text>
          </Container>
        </Group>
        <br />
        <br />
        <NavLink
          className={classes.NavLink}
          href="dashboard"
          label="Dashboard"
          leftSection={
            <IconDashboard className={classes.linkIcon} stroke={1.5} />
          }
        />
        <NavLink
          leftSection={<IconFile className={classes.linkIcon} stroke={1.5} />}
          className={classes.NavLink}
          href=""
          label="Property"
        >
          <NavLink
            className={classes.NavLink}
            leftSection={<IconPlus className={classes.linkIcon} stroke={1.5} />}
            label="Add Property"
            href="property"
          />
          <NavLink
            className={classes.NavLink}
            leftSection={
              <IconTable className={classes.linkIcon} stroke={1.5} />
            }
            label="Property Detail"
            href="property-details"
          />
        </NavLink>
        <NavLink
          leftSection={<IconHome className={classes.linkIcon} stroke={1.5} />}
          className={classes.NavLink}
          href=""
          label="Unit Details"
        >
          <NavLink
            className={classes.NavLink}
            leftSection={<IconPlus className={classes.linkIcon} stroke={1.5} />}
            label="Add Unit Details"
            href="unit"
          />
          <NavLink
            className={classes.NavLink}
            leftSection={
              <IconTable className={classes.linkIcon} stroke={1.5} />
            }
            label="All Unit Details"
            href="unit-detail"
          />
          <NavLink
            className={classes.NavLink}
            leftSection={
              <IconBuilding className={classes.linkIcon} stroke={1.5} />
            }
            label="Vacant Units"
            href="vacant-detail"
          />
          <NavLink
            className={classes.NavLink}
            leftSection={
              <IconBuilding className={classes.linkIcon} stroke={1.5} />
            }
            label="Occupied Units"
            href="occupied-detail"
          />
          <NavLink
            className={classes.NavLink}
            leftSection={
              <IconBuilding className={classes.linkIcon} stroke={1.5} />
            }
            label="Renovation Units"
            href="renovation-detail "
          />
          <NavLink
            className={classes.NavLink}
            leftSection={
              <IconBuilding className={classes.linkIcon} stroke={1.5} />
            }
            label="Owner View"
            href="#required-for-focus"
          />
          <NavLink
            className={classes.NavLink}
            leftSection={
              <IconBuilding className={classes.linkIcon} stroke={1.5} />
            }
            label="Ready to move in units"
            href="#required-for-focus"
          />
        </NavLink>

        <NavLink
          leftSection={
            <IconBriefcase className={classes.linkIcon} stroke={1.5} />
          }
          className={classes.NavLink}
          href=""
          label="Tenants Details"
        >
          <NavLink
            className={classes.NavLink}
            leftSection={<IconPlus className={classes.linkIcon} stroke={1.5} />}
            label="Add Tenants Detail"
            href="tenant"
          />
          <NavLink
            className={classes.NavLink}
            leftSection={<IconHome className={classes.linkIcon} stroke={1.5} />}
            label="Tenants Detail"
            href="tenant-detail"
          />
        </NavLink>
        <NavLink
          leftSection={
            <IconCreditCard className={classes.linkIcon} stroke={1.5} />
          }
          className={classes.NavLink}
          href=""
          label="Rental Payment"
        >
          <NavLink
            className={classes.NavLink}
            leftSection={<IconPlus className={classes.linkIcon} stroke={1.5} />}
            label="Add Rental Payment"
            href="rental"
          />
          <NavLink
            className={classes.NavLink}
            leftSection={<IconHome className={classes.linkIcon} stroke={1.5} />}
            label="Rental Payment Detail"
            href="rental-detail"
          />
        </NavLink>
        <NavLink
          leftSection={<IconUser className={classes.linkIcon} stroke={1.5} />}
          className={classes.NavLink}
          href=""
          label="Tenant Portal"
        >
          <NavLink
            className={classes.NavLink}
            leftSection={<IconPlus className={classes.linkIcon} stroke={1.5} />}
            label="My Details"
            href="#required-for-focus"
          />
          <NavLink
            className={classes.NavLink}
            leftSection={<IconHome className={classes.linkIcon} stroke={1.5} />}
            label="Tenants View"
            href="#required-for-focus"
          />
          <NavLink
            className={classes.NavLink}
            leftSection={<IconCash className={classes.linkIcon} stroke={1.5} />}
            label="My Payment"
            href="#required-for-focus"
          />
        </NavLink>
        <NavLink
          leftSection={
            <IconUserPlus className={classes.linkIcon} stroke={1.5} />
          }
          className={classes.NavLink}
          href=""
          label="Maintenance People"
        >
          <NavLink
            className={classes.NavLink}
            leftSection={<IconPlus className={classes.linkIcon} stroke={1.5} />}
            label="Add Staff"
            href="#required-for-focus"
          />
          <NavLink
            className={classes.NavLink}
            leftSection={<IconHome className={classes.linkIcon} stroke={1.5} />}
            label="All Staff"
            href="#required-for-focus"
          />
        </NavLink>
        <NavLink
          leftSection={<IconUser className={classes.linkIcon} stroke={1.5} />}
          className={classes.NavLink}
          href=""
          label="Complaints"
        >
          <NavLink
            className={classes.NavLink}
            leftSection={<IconPlus className={classes.linkIcon} stroke={1.5} />}
            label="Raise Complaint"
            href="raised-complaint"
          />
          <NavLink
            className={classes.NavLink}
            leftSection={<IconUser className={classes.linkIcon} stroke={1.5} />}
            label="All Complaint"
            href="all-complaintdetail"
          />
          <NavLink
            className={classes.NavLink}
            leftSection={<IconUser className={classes.linkIcon} stroke={1.5} />}
            label="Complaint Manager Veiw"
            href="#required-for-focus"
          />
          <NavLink
            className={classes.NavLink}
            leftSection={<IconUser className={classes.linkIcon} stroke={1.5} />}
            label="Complaint Owner Veiw"
            href="#required-for-focus"
          />
          <NavLink
            className={classes.NavLink}
            leftSection={<IconUser className={classes.linkIcon} stroke={1.5} />}
            label="Complaint Manger Veiw"
            href="#required-for-focus"
          />
        </NavLink>
        <NavLink
          leftSection={<IconUser className={classes.linkIcon} stroke={1.5} />}
          className={classes.NavLink}
          href=""
          label="Visitors"
        >
          <NavLink
            className={classes.NavLink}
            leftSection={<IconUser className={classes.linkIcon} stroke={1.5} />}
            label="Add Visitors"
            href="add-visitor"
          />
          <NavLink
            className={classes.NavLink}
            leftSection={<IconHome className={classes.linkIcon} stroke={1.5} />}
            label="All Visitors Details"
            href="visitor-detail"
          />
          <NavLink
            className={classes.NavLink}
            leftSection={<IconHome className={classes.linkIcon} stroke={1.5} />}
            label=" My Visitors"
            href="#required-for-focus"
          />
          <NavLink
            className={classes.NavLink}
            leftSection={<IconHome className={classes.linkIcon} stroke={1.5} />}
            label="Weekly Visitor Stats"
            href="#required-for-focus"
          />
          <NavLink
            className={classes.NavLink}
            leftSection={<IconHome className={classes.linkIcon} stroke={1.5} />}
            label="Monthly Visitor Stats"
            href="#required-for-focus"
          />
        </NavLink>
        {/* <NavLink
          leftSection={<IconUser className={classes.linkIcon} stroke={1.5} />}
          className={classes.NavLink}
          href=""
          label="Contacts"
        >
          <NavLink
            className={classes.NavLink}
            leftSection={<IconPlus className={classes.linkIcon} stroke={1.5} />}
            label="Add Contacts"
            href="#required-for-focus"
          />
          <NavLink
            className={classes.NavLink}
            leftSection={<IconHome className={classes.linkIcon} stroke={1.5} />}
            label="All Contacts"
            href="#required-for-focus"
          />
        </NavLink> */}
        <NavLink
          leftSection={
            <IconSettingsCog className={classes.linkIcon} stroke={1.5} />
          }
          className={classes.NavLink}
          href=""
          label="Configurations"
        >
          <NavLink
            className={classes.NavLink}
            leftSection={
              <IconTools className={classes.linkIcon} stroke={1.5} />
            }
            label="Amenities"
            href="amenities-detail"
          />

          <NavLink
            className={classes.NavLink}
            leftSection={<IconPlus className={classes.linkIcon} stroke={1.5} />}
            label="Owner"
            href="owner"
          />
          <NavLink
            className={classes.NavLink}
            leftSection={
              <IconBuildingSkyscraper
                className={classes.linkIcon}
                stroke={1.5}
              />
            }
            label="Floor"
            href="floor-detail"
          />
          <NavLink
            className={classes.NavLink}
            leftSection={
              <IconBarrierBlock className={classes.linkIcon} stroke={1.5} />
            }
            label="Block"
            href="block-detail"
          />
          <NavLink
            className={classes.NavLink}
            leftSection={<IconUser className={classes.linkIcon} stroke={1.5} />}
            label="All Owner Detail"
            href="owner-detail"
          />
          <NavLink
            className={classes.NavLink}
            leftSection={
              <IconFile3d className={classes.linkIcon} stroke={1.5} />
            }
            label="Add Policy"
            href="add-policy"
          />
        </NavLink>
      </div>
    </nav>
  );
}
